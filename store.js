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
                try {
                    const token_res = await api.post('/api/token/', { "username": username, "password": password })
                    localStorage.setItem(ACCESS_TOKEN, token_res.data.access)
                    localStorage.setItem(REFRESH_TOKEN, token_res.data.refresh)
                    const decoded = jwtDecode(token_res.data.access)
                    const user_data_res = await api.get('/api/users/' + decoded.user_id + '/')
                    const user_id = user_data_res.data.id
                    if (user_data_res.data.last_login === null) {
                        const setInfo = useNotifyStore.getState().setInfo
                        setInfo("Welcome to UniSwap! This is the Home Page, where you will find current listings for tickets.")
                    }
                    set({ current_user: user_data_res.data })
                    await api.patch('/api/users/' + user_id + "/", {
                        "last_login": new Date()
                    })
                    router.push('/home')
                } catch {
                    const setError = useNotifyStore.getState().setError
                    setError("Login Failed")
                }
            },
            refreshCurrentUser: async () => {
                try {
                    const token = localStorage.getItem(ACCESS_TOKEN)
                    const decoded = jwtDecode(token)
                    const user_data_res = await api.get('/api/users/' + decoded.user_id + '/')
                    set({ current_user: user_data_res.data })
                } catch {
                    const setError = useNotifyStore.getState().setError
                    setError("Failed to get Current User")
                }
            }
        }), {
        name: 'auth-storage'
    }
    ))

export const useNotifyStore = create(
    (set) => ({
        error: null,
        warn: null,
        info: null,
        success: null,
        setError: (error) => {
            set({ error: error })
        },
        setWarn: (warn) => {
            set({ warn: warn })
        },
        setInfo: (info) => {
            set({ info: info })
        },
        setSuccess: (success) => {
            set({ success: success })
        },
        clearError: () => {
            set({ error: null })
        },
        clearWarn: () => {
            set({ warn: null })
        },
        clearInfo: () => {
            set({ info: null })
        },
        clearSuccess: () => {
            set({ success: null })
        }
    })
)