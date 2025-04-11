import React from 'react'
import {useState, useEffect} from 'react'
import PostCardGrid from '@/components/PostCardGrid'

export default function home() {

    const [jwt, setJwt] = useState(null)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const token_url = "http://localhost:8000/api/token/";
        fetch(token_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "hudsonodonnell",
                password: "Jessebear0",
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }


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
        <div className="flex flex-col">
            <div className="flex flex-col justify-center h-16 mx-10">
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
