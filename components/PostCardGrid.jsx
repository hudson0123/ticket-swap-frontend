import PostCard from './PostCard'

export default function PostCardGrid({posts, users}) {

    return (
        <div className="grid grid-cols-1 w-screen place-items-center gap-2 sm:gap-10 p-10">
            {posts.map(post => (
                <PostCard 
                    key = {post.id}
                    post = {post}
                    users = {users}
                />
            ))}
        </div>
    )
}
