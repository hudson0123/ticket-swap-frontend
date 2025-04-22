import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { useAuthStore } from '@/store'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const router = useRouter()
  const access = useAuthStore((state) => state.access)
  const refresh = useAuthStore((state) => state.refresh)
  const setAccess = useAuthStore((state) => state.setAccess)
  const isHydrated = useAuthStore((state) => state.isHydrated)

  useEffect(() => {

    const auth = async () => {
      if (!isHydrated) {
        return
      }
      if (!access) {
        setIsAuthorized(false)
        return
      }

      try {
        const decoded = jwtDecode(access)
        const now = Date.now() / 1000

        if (decoded.exp < now) {
          await refreshToken()
        } else {
          setIsAuthorized(true)
        }
      } catch (err) {
        console.error("JWT decode failed:", err)
        setIsAuthorized(false)
      }
    }

    const refreshToken = async () => {
      if (!refresh) {
        setIsAuthorized(false)
        return
      }

      try {
        const res = await api.post('/api/token/refresh/', { refresh })
        if (res.status === 200) {
          setAccess(res.data.access)
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (err) {
        console.error("Token refresh failed:", err)
        setIsAuthorized(false)
      }
      console.log("HERE" + isAuthorized)
    }

    auth()
  }, [access, refresh, setAccess])

  useEffect(() => {
    if (isAuthorized === false) {
      router.replace('/login')
    }
  }, [isAuthorized, router])

  if (isAuthorized === null || isAuthorized === false) {
    return <div>Loading...</div>
  }

  return children
}