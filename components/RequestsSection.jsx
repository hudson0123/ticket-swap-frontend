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

            accountUser.received_requests.forEach((id) => {
                path2 += "id=" + id + "&"
            })
            const url1 = url_base + path1
            const url2 = url_base + path2
            
            const [sent_res, received_res] = await Promise.all([
                api.get(url1),
                api.get(url2)
            ])


            setSent(sent_res.data)
            setReceived(received_res.data)

        }
        getRequestData()
    }, [])

    const handleAccept = async (id) => {
        await api.patch('api/requests/' + id + '/', {
            status: "approved"
        })
    }

    const handleDeny = async (id) => {
        await api.patch('api/requests/' + id + '/', {
            status: "rejected"
        })
    }

    if (!sent || !received) {
        return <p className='text-black'>loading...</p>
    }


    return (
        <>
            <div className='bg-red'>
                <h1 className='font-semibold underline mb-2'>Sent Requests</h1>
                {sent.map((req) => {
                    return (
                        <div className='flex items-center text-sm my-1'>
                            <p className='justify-start font-medium'>{req.post.ticket} -</p>
                            <p className='mx-2 italic' >{req.recipient.username}</p>
                            {req.status === "rejected" ? (
                                <p className='ml-auto border-1 border-gray-500 bg-red-500 rounded-full py-1 px-2'>Rejected</p>
                            ) : req.status === "accepted" ? (
                                <p className='ml-auto border-1 border-gray-500 bg-green-500 rounded-full py-1 px-2'>Accepted</p>
                            ) : (
                                <p className='ml-auto border-1 border-gray-500 bg-gray-300 rounded-full py-1 px-2'>Sent</p>
                            )}
                        </div>
                    )
                })
                }

            </div>
            <div className='bg-red'>
                <h1 className='font-semibold underline my-2'>Received Requests</h1>

                {received.map((req) => {
                    return (
                        <div key={req.id} className='flex items-center text-sm my-1'>
                            <p className='justify-start font-medium'>{req.post.ticket} -</p>
                            <p className='mx-2 italic' >{req.recipient.username}</p>
                            <div className='ml-auto'>
                                <button onClick={() => handleDeny(req.id)}>X</button>
                                <button onClick={() => handleAccept(req.id)} className='ml-2'>&#10003;</button>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </>
    )
}
