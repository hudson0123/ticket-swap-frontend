import React from 'react'
import PostCard from './PostCard'

export default function PostCardGrid({posts, users}) {

    function getUsernamebyId(id) {
        const user = users.find(u => u.id === id)
        return user ? user.username : "Loading.."
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-screen gap-2 sm:gap-10 p-10">
            {posts.map(post => (
                <PostCard 
                    title = {post.ticket}
                    price = {post.ticket_price}
                    created_at={post.created_at.date}
                />
            ))}
        </div>
    )
}
