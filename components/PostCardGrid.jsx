import PostCard from './PostCard'

export default function PostCardGrid({posts}) {

    return (
        <div className="grid grid-cols-1 w-screen place-items-center gap-2 mt-2 sm:gap-y-10 p-x-10">
            {posts.map(post => (
                <PostCard 
                    key = {post.id}
                    post = {post}
                />
            ))}
        </div>
    )
}
