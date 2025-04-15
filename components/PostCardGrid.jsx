import React, { useState, useEffect } from 'react'
import { ACCESS_TOKEN } from '@/constants'
import { jwtDecode } from 'jwt-decode'
import api from '@/api'
import PostCard from './PostCard'

export default function PostCardGrid({posts, users}) {

    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            const current_user_id = jwtDecode(token).user_id
            const res2 = await api.get('/api/users/' + current_user_id + '/')
            setCurrentUser(res2.data)
        }
        fetchData()
    }, [])

    return (
        <div className="grid grid-cols-1 w-screen place-items-center gap-2 sm:gap-10 p-10">
            {posts.map(post => (
                <PostCard 
                    post = {post}
                    users = {users}
                    currentUser={currentUser}
                />
            ))}
        </div>
    )
}
