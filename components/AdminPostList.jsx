import React from 'react'
import { useState, useEffect } from 'react'
import api from '@/api'

export default function AdminPostList() {


    const [jwt, setJwt] = useState(null)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const users_res = await api.get('api/users')
                const posts_res = await api.get('api/posts')

                console.log(users_res.data)
                console.log(posts_res.data)
                setUsers(users_res.data)
                setPosts(posts_res.data)
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    }, []);

    function getUsernamebyId(id) {
        const user = users.find(u => u.id === id)
        return user ? user.username : "Loading..."
    }

    return (
        <div className="bg-white border-2 border-gray-500 w-full lg:w-2/3 flex flex-col h-[90vh] rounded-2xl shadow-md">
            <div className="flex flex-col items-left ml-10 py-6">
                <h2 className="font-bold text-3xl mb-1">Posts List</h2>
                <h3 className="font-thin">{posts.length} total</h3>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg mx-10 my-0">
                <div className="flex items-center mb-2 md:mb-0">
                    <img className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
                    <span className="font-bold">Author</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-28 text-sm md:text-base font-bold">
                    <span>Ticket</span>
                    <span>Price</span>
                    <span>Category</span>
                    <span>Views</span>
                </div>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col p-4 sm:p-6 md:p-10 rounded-xl overflow-y-auto max-h-[80vh]">

                <div className="space-y-4">
                    {posts.map(post => (
                        <div key={post.id} className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg">
                            <div className="flex items-center mb-2 md:mb-0">
                                <img className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
                                <span className="font-bold">{getUsernamebyId(post.author)}</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-34 text-sm md:text-base mr-5">
                                <span>{post.ticket}</span>
                                <span>${post.ticket_price}</span>
                                <span>{post.category}</span>
                                <span>{post.views}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
