import React, { useState } from 'react'
import api from '@/api'
import { useRouter } from 'next/router'
import { jwtDecode } from 'jwt-decode'
import { ACCESS_TOKEN } from '@/constants'

export default function CreatePostForm() {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    const [sponsored, setSponsored] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const token = localStorage.getItem(ACCESS_TOKEN)
        const current_user = jwtDecode(token).user_id
        try {
            const res = await api.post('/api/posts/', {
                "author": current_user,
                "ticket": title,
                "ticket_price": price,
                "description": description,
                "category": category,
                "meetup_time": time,
                "meetup_location": location,
                "is_sponsored": sponsored,
            })
            router.push('/home')
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto border border-white p-5 rounded">
            <h1 className="text-white font-bold mb-5 text-2xl">Create Post</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ticket Title"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <label className="flex items-center gap-2 mb-5 text-white">
                <input
                    type="checkbox"
                    checked={sponsored}
                    onChange={(e) => setSponsored(e.target.checked)}
                />
                Sponsor Post
            </label>
            <button type="submit" className="text-white border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    )
}