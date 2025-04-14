import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            localStorage.clear()
            const res = await api.post('/api/token/', {"username": username, "password": password})
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
            router.push('/home')
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false)
        }

    }

    return (
        <form className="m-10 bg-white w-fit p-3 rounded" onSubmit={handleSubmit}>
            <h1 className="text-black font-bold mb-5 text-2xl">Login</h1>
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
            <button type="submit" className="text-black border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Login"}
            </button>
            <p className="text-sm">Don't Have an account? Register <a className="italic " href="/register">here</a>.</p>
        </form>
    )
}
