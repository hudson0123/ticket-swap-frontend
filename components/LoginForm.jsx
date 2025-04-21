import { useAuthStore, useNotifyStore } from '@/store'
import { useState } from 'react'

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const setNotification = useNotifyStore((state) => state.setNotification)

    const login = useAuthStore((state) => state.login)
    const current_user = useAuthStore((state) => state.current_user)

    
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            await login(username, password)
        } catch (e) {
            setNotification("error", "Failed to Login.")
        } finally {
            setLoading(false)
        }
        
    }

    return (
        <form className=" h-fit m-10 w-fit p-3 rounded border border-white" onSubmit={handleSubmit}>
            <h1 className="text-white font-bold mb-5 text-2xl">Login</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-black bg-white block rounded mb-5 py-1 px-2"
            />
            <button type="submit" className="text-white border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Login"}
            </button>
            <p className="text-sm text-white">Don't Have an account? Register <a className="italic " href="/register">here</a>.</p>
        </form>
    )
}