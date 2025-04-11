import { useEffect, useState } from 'react';
import PostCardGrid from '@/components/PostCardGrid';

export default function Home() {

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
      <div className="h-16 bg-red-500">
        <p>Search</p>
      </div>
      <PostCardGrid
        posts={posts}
        users={users}
      />
    </div>
  );
};
