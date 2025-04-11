import React from 'react'
import PostCard from './PostCard'

export default function PostCardGrid({posts, users}) {

    function getUsernamebyId(id) {
        const user = users.find(u => u.id === id)
        return user ? user.username : "Loading.."
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 w-screen gap-10 p-10">
            {posts.map(post => (
                <PostCard 
                    author = {getUsernamebyId(post.author)}
                    title = {post.ticket}
                    price = {post.ticket_price}
                    description={post.description}
                />
            ))}
        </div>
    )
}
