import React from 'react'
import UserCard from '@/components/UserCard'
import {useState, useEffect} from 'react'


export default function users() {


    const [jwt, setJwt] = useState(null)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [requests, setRequests] = useState([])


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
        const users_url = "http://localhost:8000/api/users/";
        if (jwt !== null) { // Only fetch if JWT is set
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
        if (jwt !== null) { // Only fetch if JWT is set
            fetch(posts_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt.access,
                }
            }).then((res) => res.json()).then((json) => setPosts(json)).catch((err) => console.error(err))
        }
    }, [jwt]);

    useEffect(() => {
        const requets_url = "http://localhost:8000/api/requests/";
        if (jwt !== null) { // Only fetch if JWT is set
            fetch(requets_url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + jwt.access,
                }
            }).then((res) => res.json()).then((json) => setRequests(json)).catch((err) => console.error(err))
        }
    }, [jwt]);

    return (
        <div>
            <UserCard
                users={users}
                posts={posts}
                requests={requests}
            />
        </div>
    )
}
