import React from 'react'
import api from '@/api'
import { useAuthStore, useErrorStore } from '@/store'

export default function PostCard({ post, users }) {

    const setError = useErrorStore((state) => state.setError)


    const sendRequest = async () => {

        try {
            const res = await api.post('/api/requests/', {
                "sender": currentUser.id,
                "recipient": post.author,
                "post": post.id
            })
        }
        catch (e) {
            setError(e.message)
        }

    }
    
    const getUserById = (post_id) => {
        return users.find(user => user.id === post_id)
    }

    const postUser = getUserById(post.author)
    const currentUser = useAuthStore((state) => state.current_user)
    const error = useErrorStore((state) => state.error)
    
    return (
        <div className="relative flex border-b border-white text-white w-4/5 h-fit pb-10">
            <p className="sm:h-10 sm:w-10 w-5 h-5 absolute top-3 right-20">@{postUser?.username || 'unknown'}</p>
            {currentUser.id !== postUser.id && (
                <button className="absolute bottom-3 right-5 border py-1 px-2" onClick={sendRequest}>Request</button>
            )}
            <div className="h-20">
                <h1 className="font-semibold text-md sm:text-xl">{post.ticket}</h1>
                <p className="font-thin italic text-sm sm:text-lg">${post.ticket_price}</p>
                <p className="font-light mt-10 text-xs">Posted on {post.created_at.slice(5, 10)}</p>
            </div>
            <hr></hr>
        </div>
    )
}
