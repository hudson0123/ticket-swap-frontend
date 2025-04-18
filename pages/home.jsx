import React from 'react'
import { useState, useEffect } from 'react'
import PostCardGrid from '@/components/PostCardGrid'
import api from '@/api'
import { useNotifyStore } from '@/store'

export default function home() {

    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [toggleSearchBar, setToggleSearchBar] = useState("invisible")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users_res = await api.get('api/users')
                const posts_res = await api.get('api/posts')
                setUsers(users_res.data)
                setPosts(posts_res.data)
            } catch (e) {
                const setError = useNotifyStore.getState().setError
                setError("Failed to get Posts")
            }
        }
        fetchData()
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSearchBar = () => {
        toggleSearchBar === "" ? setToggleSearchBar("invisible") : setToggleSearchBar("")
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3 mx-5">
                <img
                    className="w-6 h-6 cursor-pointer fixed bottom-4 left-4"
                    src="/search.svg"
                    onClick={handleSearchBar}
                    alt="Search icon"
                />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className={`bg-gray-200 rounded-full p-2 px-4 flex-1 transition-all duration-300 ease-in-out ${toggleSearchBar}`}
                    placeholder="Search..."
                />
            </div>
            <PostCardGrid
                posts={posts.filter((post) => post.ticket.toLowerCase().includes(searchTerm.toLowerCase()))}
                users={users}
            />
        </div>
    )
}
