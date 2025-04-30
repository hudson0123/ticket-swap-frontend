import React, { useState } from 'react'
import api from '@/api'
import { useRouter } from 'next/router'
import { useAuthStore, useNotifyStore } from '@/store'
import useForm from '@/hooks/useForm'
import UseCheckBoxInput from '@/hooks/useCheckBoxInput'

export default function CreatePostForm() {

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {value: title, onChange: onTitleChange, reset: titleReset} = useForm("")
    const {value: price, onChange: onPriceChange, reset: priceReset} = useForm("")
    const {value: description, onChange: onDescriptionChange, reset: descriptionReset} = useForm("")
    const {value: category, onChange: onCategoryChange, reset: categoryReset} = useForm("")
    const {value: time, onChange: onTimeChange, reset: timeReset} = useForm("")
    const {value: location, onChange: onLocationChange, reset: locationReset} = useForm("")
    const {value: sponsored, onChange: toggleSponsored, reset: sponsoredReset} = UseCheckBoxInput()


    const current_user = useAuthStore((state) => state.current_user)
    const setNotification = useNotifyStore((state) => state.setNotification)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            await api.post('/api/posts/', {
                "author_id": current_user.id,
                "ticket": title,
                "ticket_price": price,
                "description": description,
                "category": category,
                "meetup_time": time,
                "meetup_location": location,
                "is_sponsored": sponsored,
            })
            titleReset()
            priceReset()
            descriptionReset()
            categoryReset()
            timeReset()
            locationReset()
            sponsoredReset()
            router.push('/home')
        } catch (e) {
            setNotification("error", e.message)
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
                onChange={onTitleChange}
                placeholder="Ticket Title"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="number"
                value={price}
                onChange={onPriceChange}
                placeholder="Price"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <textarea
                value={description}
                onChange={onDescriptionChange}
                placeholder="Description"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="text"
                value={category}
                onChange={onCategoryChange}
                placeholder="Category"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="datetime-local"
                value={time}
                onChange={onTimeChange}
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <input
                type="text"
                value={location}
                onChange={onLocationChange}
                placeholder="Location"
                className="border border-black bg-white rounded block mb-5 py-1 px-2 w-full"
            />
            <label className="flex items-center gap-2 mb-5 text-white">
                <input
                    type="checkbox"
                    checked={sponsored}
                    onChange={toggleSponsored}
                />
                Sponsor Post
            </label>
            <button type="submit" className="text-white border-1 mb-3 black py-1 px-2 hover:border-gray-300 transition duration-200">
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    )
}