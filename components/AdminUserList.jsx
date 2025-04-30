import React from 'react'
import { useState, useEffect } from 'react'
import api from '@/api'
import Image from 'next/image'

export default function AdminUserList() {

    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const users_res = await api.get('api/users')
                const posts_res = await api.get('api/posts')

                setUsers(users_res.data)
                setPosts(posts_res.data)
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    }, []);

    return (
        <div className="bg-white border-2 border-gray-500 w-full lg:w-2/3 flex flex-col h-[90vh] rounded-2xl shadow-md">
            <div className="flex flex-col items-left ml-10 py-6">
                <h2 className="font-bold text-3xl mb-1">User List</h2>
                <h3 className="font-thin">{users.length} total</h3>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg mx-10 my-0">
                <div className="flex items-center mb-2 md:mb-0">
                    <Image width={10} height={10} className="w-10 h-10 mr-4" src="/profile.svg" alt="User icon" />
                    <span className="font-bold">Username</span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-28 text-sm md:text-base font-bold">
                    <span>Posts</span>
                    <span>Joined</span>
                    <span>Rating</span>
                    <span>Verified</span>
                </div>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col p-4 sm:p-6 md:p-10 rounded-xl overflow-y-auto max-h-[80vh]">

                <div className="space-y-4">
                    {users.map(user => (
                        <div key={user.id} className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg">
                            <div className="flex items-center mb-2 md:mb-0">
                                <Image width={10} height={10} className="w-10 h-10 mr-4" src="/profile.svg" alt="User icon" />
                                <span className="font-bold">{user.username}</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-34 text-sm md:text-base mr-5">
                                <span>{posts.filter(post => post.author === user.id).length}</span>
                                <span>{user.date_joined.slice(5, 10)}</span>
                                <span>{user.rating}</span>
                                <span>{user.is_uga_verified ? "Yes" : "No"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
