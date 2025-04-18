import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'
import { useNotifyStore } from '@/store'

export default function LoginForm() {

    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [loading, setLoading] = useState(false)
    const [terms, setTerms] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            if (password1 !== password2) {
                const setError = useNotifyStore.getState().setError
                setError("Passwords Do Not Match")
            } else if (terms !== true) {
                const setInfo = useNotifyStore.getState().setInfo
                setInfo("Please Agree to the Terms & Conditions.")
            } else {
                localStorage.clear()
                const res = await api.post('/api/createUser/', { "username": username, "password": password1, "first_name": firstName, "last_name": lastName, "email": email })
                const setSuccess = useNotifyStore.getState().setSuccess
                setSuccess("Registration Successful.")
                router.push('/login')
            }
        } catch (e) {
            const setError = useNotifyStore.getState().setError
            setError("Failed to create user.")
        } finally {
            setLoading(false)
        }

    }

    return (
        <form className="m-10 w-fit p-3 rounded border border-white" onSubmit={handleSubmit}>
            <h1 className="text-white font-bold mb-5 text-2xl">Register</h1>
            <label className="text-white font-semibold" for="username">Username: </label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

                required />
            <label className="text-white font-semibold" for="emaill">Email: </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

            />
            <label className="text-white font-semibold" for="first_name">Full Name: </label>
            <br></br>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
                className="border border-black bg-white rounded mb-5 py-1 px-2 mr-5"

            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
                className="border border-black bg-white rounded mb-5 py-1 px-2"

            />
            <br></br>
            <label className="text-white font-semibold" for="username">Pasword: </label>
            <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

            />
            <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

            />
            <input
                type="checkbox"
                id="terms"
                onClick={() => { setTerms(!terms); console.log(terms) }}
                />
            <label className="text-white font-semibold" for="terms"> I Agree to the Terms & Conditions</label><br></br>
            <button type="submit" className="text-white border-1 my-5 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm text-white">Already have an account? Login <a className="italic " href="/login">here</a>.</p>
        </form>
    )
}
