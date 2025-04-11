import React from 'react'
import { useState, useEffect } from 'react'

export default function AdminUserList() {


    const [jwt, setJwt] = useState(null)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])


    useEffect(() => {
        const token_url = "http://localhost:8000/api/token/";
        fetch(token_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "",
                password: "",
            }),
        }).then((res) => res.json()).then((json) => setJwt(json)).catch((err) => console.error(err))
    }, [])

    useEffect(() => {
        const users_url = "http://localhost:8000/api/users/random/";
        if (jwt !== null) { // Only fetch if JWT is set
            console.log(jwt)
            fetch(users_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt.access,
                }
            }).then((res) => res.json()).then((json) => setUsers(json)).catch((err) => console.error(err))
            console.log(users)
        }
    }, [jwt]);

    useEffect(() => {
        const posts_url = "http://localhost:8000/api/posts/";
        if (jwt !== null) {
            fetch(posts_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt.access,
                }
            }).then((res) => res.json()).then((json) => setPosts(json)).catch((err) => console.error(err))
        }
    }, [jwt]);

    return (
        <div className="bg-white border-2 border-gray-500 w-full lg:w-2/3 flex flex-col h-[90vh] rounded-2xl shadow-md">
            <div className="flex flex-col items-left ml-10 py-6">
                <h2 className="font-bold text-3xl mb-1">User List</h2>
                <h3 className="font-thin">{users.length} total</h3>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg mx-10 my-0">
                <div className="flex items-center mb-2 md:mb-0">
                    <img className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
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
                                <img className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
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
