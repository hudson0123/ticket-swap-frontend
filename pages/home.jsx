import React from 'react'
import { useState, useEffect } from 'react'
import PostCardGrid from '@/components/PostCardGrid'
import api from '@/api'
import { useNotifyStore } from '@/store'
import SearchBar from '@/components/SearchBar'

export default function home() {

    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                await api.get('api/posts').then(res => setPosts(res.data))
            } catch (e) {
                useNotifyStore.getState().setNotification("error", "Failed to get Posts")
            }
        }
        fetchData()
    }, []);


    return (
        <div className="flex flex-col">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <PostCardGrid
                posts={posts.filter((post) => post.ticket.toLowerCase().includes(searchTerm.toLowerCase()))}
            />
        </div>
    )
}
