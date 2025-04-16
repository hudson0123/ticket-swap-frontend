import React from 'react'
import {useState, useEffect} from 'react'
import PostCardGrid from '@/components/PostCardGrid'
import api from '@/api'

export default function home() {


    const [jwt, setJwt] = useState(null)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")


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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center h-16 mx-10">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="bg-white rounded-full p-2" 
                    placeholder="Search.."
                    ></input>
            </div>
            <PostCardGrid
                posts={posts.filter((post) => post.ticket.toLowerCase().includes(searchTerm.toLowerCase()))}
                users={users}
            />
        </div>
    )
}
