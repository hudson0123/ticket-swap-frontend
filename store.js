import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import router from 'next/router'
import api from '@/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = create(
    persist(
        (set) => ({
            status: false,
            current_user: null,
            logout: () => {
                console.log("RUNNING LOGOUT")
                set({ status: false })
                localStorage.clear()
                router.push('/login')
            },
            login: async (username, password) => {
                console.log("RUNNING LOGIN")
                localStorage.clear()
                set({ status: true })
                const token_res = await api.post('/api/token/', { "username": username, "password": password })
                localStorage.setItem(ACCESS_TOKEN, token_res.data.access)
                localStorage.setItem(REFRESH_TOKEN, token_res.data.refresh)
                const decoded = jwtDecode(token_res.data.access)
                const user_data_res = await api.get('/api/users/' + decoded.user_id + '/')
                set({current_user: user_data_res.data})
                console.log(user_data_res.data)
                router.push('/home')
            }
        }), {
            name: 'auth-storage'
        }
    ))

export const useErrorStore = create(
    (set) => ({
        error: null,
        setError: (error) => {
            set({error: error})
        },
        clearError: () => {
            set({error: null})
        }
    })
)