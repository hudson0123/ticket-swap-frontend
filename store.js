import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import router from 'next/router'
import api from '@/api'

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
                set({ current_user: null, access: null, refresh: null })             
                router.push('/login')
            },
            login: async (username, password) => {
                set({current_user: null})
                try {
                    const auth_token_res = await api.post('/api/token/', { 
                            "username": username, 
                            "password": password 
                        })
                    set({access: auth_token_res.data.access})
                    set({refresh: auth_token_res.data.refresh})
                    const current_user_data_res = await api.get('/api/current-user/')
                    set({ current_user: current_user_data_res.data })
                    router.push('/home')
                } catch (e) {
                    console.error(e)
                    useNotifyStore.getState().setNotification("error", e.message)
                }
            },
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