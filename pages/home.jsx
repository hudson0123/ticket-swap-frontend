import api from '@/api'
import PostCardGrid from '@/components/PostCardGrid'
import SearchBar from '@/components/SearchBar'
import { useNotifyStore } from '@/store'
import CircularProgress from '@mui/material/CircularProgress'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { LinearProgress } from '@mui/material'

const queryPosts = async ({ pageParam }) => {
    const res = await api.get('api/posts/?page=' + pageParam)
    return res.data
}

export default function home() {

    const [searchTerm, setSearchTerm] = useState("")
    const { data, error, isPending, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: queryPosts,
        initialPageParam: 1,
        getNextPageParam: (lastpage) => {
            if (!lastpage.next) return null
            const url = new URL(lastpage.next)
            return url.searchParams.get("page")
        }

    })
    console.log(data)
    const { ref, inView } = useInView()


    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    if (isPending) {
        return (
            <div className='flex justify-center items-center h-[80vh]'>
                <CircularProgress size="5rem" />
            </div>
        )
    }
    
    if (error) {
        return
    }

    return (
        <>
            <div className="flex flex-col">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
                {data.pages.map((page) => {
                    return (
                        <PostCardGrid
                            posts={page.results.filter((post) => post.ticket.toLowerCase().includes(searchTerm.toLowerCase()))}
                        />
                    )
                })
                }
            </div>
            <div className="relative">
                {hasNextPage ? (
                    <div className='mt-5'>
                        <LinearProgress />
                    </div>
                ): (
                    <div className='flex flex-col w-full justify-center align-middle my-5'>
                        <h2 className='font-bold text-white ml-auto mr-auto'>That's all the posts we have :)</h2>
                    </div>
                )}
                <div ref={ref} className='absolute top-[-200px]'></div>
            </div>
        </>
    )

}
