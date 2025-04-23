import React, { use } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import api from '@/api'
import { useNotifyStore } from '@/store'
import useFormInput from '@/hooks/useFormInput'
import UseCheckBoxInput from '@/hooks/useCheckBoxInput'

export default function RegisterForm() {

    const router = useRouter()

    const setNotification = useNotifyStore((state) => state.setNotification)
    const [loading, setLoading] = useState(false)
    const { value: username, onChange: handleUsernameChange, reset: resetUsername } = useFormInput("")
    const { value: email, onChange: handleEmailChange, reset: resetEmail } = useFormInput("")
    const { value: firstName, onChange: handleFirstNameChange, reset: resetFirstName } = useFormInput("")
    const { value: lastName, onChange: handleLastNameChange, reset: resetLastName } = useFormInput("")
    const { value: password1, onChange: handlePassword1Change, reset: resetPassword1 } = useFormInput("")
    const { value: password2, onChange: handlePassword2Change, reset: resetPassword2 } = useFormInput("")
    const { value: termsCheckBox, onChange: handleTermsCheckBoxToggle, reset: resetTermsCheckBox } = UseCheckBoxInput()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (password1 !== password2) {
                setNotification("error", "Passwords Do Not Match")
            } else if (termsCheckBox !== true) {
                setNotification("info", "Please Agree to the Terms & Conditions.")
            } else {
                await api.post('/api/createUser/', { "username": username, "password": password1, "first_name": firstName, "last_name": lastName, "email": email })
                setNotification("success", "Registration Successful.")
                resetUsername()
                resetEmail()
                resetFirstName()
                resetLastName()
                resetPassword1()
                resetPassword2()
                resetTermsCheckBox()
                router.push('/login')
            }
        } catch (e) {
            setNotification("error", "Failed to create user.")
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
                onChange={handleUsernameChange}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

                required />
            <label className="text-white font-semibold" for="emaill">Email: </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <label className="text-white font-semibold" for="first_name">Full Name: </label>
            <br></br>
            <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="First"
                className="border border-black bg-white rounded mb-5 py-1 px-2 mr-5"
            />
            <input
                type="text"
                value={lastName}
                onChange={handleLastNameChange}
                placeholder="Last"
                className="border border-black bg-white rounded mb-5 py-1 px-2"
            />
            <br></br>
            <label className="text-white font-semibold" for="username">Pasword: </label>
            <input
                type="password"
                value={password1}
                onChange={handlePassword1Change}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="password"
                value={password2}
                onChange={handlePassword2Change}
                placeholder="Required"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"

            />
            <input
                type="checkbox"
                id="terms"
                onClick={handleTermsCheckBoxToggle}
                />
            <label className="text-white font-semibold" for="terms"> I Agree to the Terms & Conditions</label><br></br>
            <button type="submit" className="text-white border-1 my-5 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Register"}
            </button>
            <p className="text-sm text-white">Already have an account? Login <a className="italic " href="/login">here</a>.</p>
        </form>
    )
}
