import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'

export default function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN)
      if (!token) {
        setIsAuthorized(false)
        return
      }

      try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000

        if (decoded.exp < now) {
          // Access token expired → try refreshing
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
      const refresh = localStorage.getItem(REFRESH_TOKEN)
      if (!refresh) {
        setIsAuthorized(false)
        return
      }

      try {
        const res = await api.post('/api/token/refresh/', { "refresh": refresh })
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access)
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (err) {
        console.error("Token refresh failed:", err)
        setIsAuthorized(false)
      }
    }

    auth()
  }, [])

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