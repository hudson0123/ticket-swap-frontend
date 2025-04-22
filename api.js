import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from './constants';
import { useAuthStore } from './store';

const api = axios.create({
    baseURL: NEXT_PUBLIC_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().access
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api