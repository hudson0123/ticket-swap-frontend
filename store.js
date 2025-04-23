import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import router from 'next/router'
import api from '@/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { jwtDecode } from 'jwt-decode'


export const useAuthStore = create(
    persist(
        (set) => ({
            current_user: null,
            access: null,
            refresh: null,
            isHydrated: false,
            setIsHydrated: (val) => {
                set({isHydrated: val})
            },
            setAccess: (newToken) => {
                set({access: newToken})
            },
            logout: () => {
                console.log("RUNNING LOGOUT")
                set({ current_user: null, access: null, refresh: null })             
                router.push('/login')
            },
            login: async (username, password) => {
                console.log("RUNNING LOGIN")
                set({access: null})
                set({refresh: null})
                set({current_user: null})
                try {
                    const token_res = await api.post('/api/token/', { "username": username, "password": password })
                    set({access: token_res.data.access})
                    set({refresh: token_res.data.refresh})
                    const decoded = jwtDecode(token_res.data.access)
                    const user_data_res = await api.get('/api/users/' + decoded.user_id + '/')
                    set({access: token_res.data.access})
                    const user_id = user_data_res.data.id
                    if (user_data_res.data.last_login === null) {
                        useNotifyStore.getState().setNotification("info", "Welcome to UniSwap! This is the Home Page, where you will find current listings for tickets.")
                    }
                    set({ current_user: user_data_res.data })
                    await api.patch('/api/users/' + user_id + "/", {
                        "last_login": new Date()
                    })
                    router.push('/home')
                    console.log("ACCESS" + useAuthStore.getState().access)
                } catch {
                    useNotifyStore.getState().setNotification("error", "Login Failed")
                }
            },
            refreshCurrentUser: async () => {
                try {
                    const decoded = jwtDecode(useAuthStore.getState().access)
                    const user_data_res = await api.get('/api/users/' + decoded.user_id + '/')
                    set({ current_user: user_data_res.data })
                } catch {
                    useNotifyStore.getState().setNotification("error", "Failed to refresh User")
                }
            }
        }), {
        name: 'auth-storage',

        onRehydrateStorage: () => {
            return (state, error) => {
                if (error || !state) {
                    return state
                }
                state.setIsHydrated(true)
            }
        }
        
    }
    ))

export const useNotifyStore = create(
    (set) => ({
        error: null,
        warn: null,
        info: null,
        success: null,
        setNotification: (notification_type, notification) => {
            set({ [notification_type]: notification})
        },
        clearNotification: (notification_type) => {
            set({ [notification_type]: null})
        },
        clearAllNotifications: () => {
            set({"error": null})
            set({"info": null})
            set({"warn": null})
            set({"success": null})
        }
    })
)