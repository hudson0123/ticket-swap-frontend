import React, { useState, useEffect } from 'react'
import api from '@/api'

export default function RequestsSection({ accountUser }) {

    const [sent, setSent] = useState(null)
    const [received, setReceived] = useState(null)

    useEffect(() => {
        const getRequestData = async () => {

            const url_base = 'api/request-batch/'

            let path1 = "?"
            let path2 = "?"

            accountUser.sent_requests.forEach((id) => {
                path1 += "id=" + id + "&"
            })
            const url1 = url_base + path1

            const sent_res = await api.get(url1)
            console.log(sent_res.data)
            setSent(sent_res.data)

            accountUser.received_requests.forEach((id) => {
                path2 += "id=" + id + "&"
            })
            const url2 = url_base + path2


            const received_res = await api.get(url2)
            console.log(received_res.data)
            setReceived(received_res.data)
        }
        getRequestData()
    }, [])

    if (!sent || !received) {
        return <p className='text-black'>loading...</p>
    } else {
        console.log("DONE")
    }


    return (
        <>
            <div className='bg-red'>
                <h1 className='font-semibold underline mb-2'>Sent Requests</h1>
                {sent.map((req) => {
                    return (
                        <div className='flex items-center'>
                            <p className='justify-start'>{req.post.ticket} -</p>
                            <p className='mx-2' >{req.recipient.username}</p>
                            <p className='ml-auto border-1 border-gray-300 rounded-full py-1 px-2'>{req.status}</p>
                        </div>
                    )
                })
                }

            </div>
            <div className='bg-red'>
                <h1 className='font-semibold underline my-2'>Received Requests</h1>

                {received.map((req) => {
                    return (
                        <div className='flex items-center'>
                            <p className='justify-start'>{req.post.ticket} -</p>
                            <p className='mx-2' >{req.recipient.username}</p>
                            <p className='ml-auto border-1 border-gray-300 rounded-full py-1 px-2'>{req.status}</p>
                        </div>
                    )
                })
                }

            </div>
        </>
    )
}
