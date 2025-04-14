import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            localStorage.clear()
            const res = await api.post('/api/createUser/', {"username": username, "password": password, "first_name": firstName, "last_name": lastName, "email": email})
            router.push('/login')
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false)
        }

    }

    return (
        <form className="m-10 bg-white w-fit p-3 rounded" onSubmit={handleSubmit}>
            <h1 className="text-black font-bold mb-5 text-2xl">Register</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"

            />
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"

            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"

            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"

            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-black bg-white rounded block mb-5 py-1 px-2"

            />
            <button type="submit" className="text-black border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm">Already have an account? Login <a className="italic " href="/login">here</a>.</p>
        </form>
    )
}
