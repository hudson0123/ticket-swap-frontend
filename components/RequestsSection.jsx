import React, { useState, useEffect } from 'react'
import api from '@/api'
import { useQueries, useMutation, useQueryClient } from '@tanstack/react-query'

export default function RequestsSection() {

    const queryClient = useQueryClient()

    const requestStatusMutation = useMutation({
        mutationFn: (request) => {
            return api.patch('/api/requests/' + request.id + '/', {
                status: request.status
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['received'] })
            queryClient.invalidateQueries({ queryKey: ['sent'] })
        }
    })

    // Query Current User Sent/Received Requests
    const results = useQueries({
        queries: [
            {
                queryKey: ['sent'], queryFn: async () => {
                    const sent_res = await api.get('/api/my-sent-requests/')
                    return sent_res.data
                }
            },
            {
                queryKey: ['received'], queryFn: async () => {
                    const received_res = await api.get('/api/my-received-requests/')
                    return received_res.data
                }
            },
        ],
    })

    // Destructure the data
    const { data: sent_data, isPending: sent_isPending, error: sent_error } = results[0]
    const { data: received_data, isPending: received_isPending, error: received_error } = results[1]

    // Check Pending or Error
    if (sent_isPending || received_isPending) {
        console.log("PENDING")
        return
    }

    if (sent_error || received_error) {
        console.error("Error")
        return
    }

    return (
        <>
            <div className='bg-red'>
                <h1 className='font-semibold underline my-2'>Following</h1>

                {sent_data.filter((req) => { return req.status == "approved" }).map((req) => {
                    return (
                        <div key={req.id} className='flex items-center text-sm my-1'>
                            <p className='mx-2 italic' >{req.post.author.username}</p>
                            <div className='ml-auto'>
                                <button onClick={() => {
                                    requestStatusMutation.mutate({ id: req.id, status: "rejected" })
                                }}>X</button>
                            </div>
                        </div>
                    )
                })
                }

            </div>
            <div className='bg-red'>
                <h1 className='font-semibold underline my-2'>Followers</h1>

                {received_data.filter((req) => { return req.status == "approved" }).map((req) => {
                    return (
                        <div key={req.id} className='flex items-center text-sm my-1'>
                            <p className='mx-2 italic' >{req.sender.username}</p>
                            <div className='ml-auto'>
                                <button onClick={() => requestStatusMutation.mutate({ id: req.id, status: "rejected" })}>{requestStatusMutation.isPending ? ("-") : ("X")}</button>
                            </div>
                        </div>
                    )
                })
                }

            </div>
            <div className='bg-red'>
                <h1 className='font-semibold underline mb-2'>Sent Requests</h1>
                {sent_data.filter((req) => { return (req.status == "pending" || req.status == "rejected") }).map((req) => {
                    return (
                        <div key={req.id} className='flex items-center text-sm my-1'>
                            {req.status === "rejected" ? (
                                <p className='mr-2 shandow bg-red-500 rounded-full py-1 px-1'></p>
                            ) : req.status === "accepted" ? (
                                <p className='mr-2 shadow bg-green-500 rounded-full py-1 px-1'></p>
                            ) : (
                                <p className='mr-2 shadow bg-gray-300 rounded-full py-1 px-1'></p>
                            )}
                            <p className='justify-start font-medium text-sm'>{req.post.ticket}</p>
                            <p className='ml-auto mx-2 italic text-sm' >{req.post.author.username}</p>
                        </div>
                    )
                })
                }

            </div>
            <div className='bg-red'>
                <h1 className='font-semibold underline my-2'>Received Requests</h1>
                {received_data.filter((req) => { return req.status == "pending" }).map((req) => {
                    return (
                        <div key={req.id} className='flex items-center text-sm my-1'>
                            <p className='justify-start font-medium'>{req.post.ticket}</p>
                            <p className='mx-2 italic' >{req.sender.username}</p>
                            <div className='ml-auto'>
                                <button onClick={() => requestStatusMutation.mutate({ id: req.id, status: "rejected" })}>{requestStatusMutation.isPending ? ("x") : ("-")}</button>
                                <button onClick={() => requestStatusMutation.mutate({ id: req.id, status: "approved" })} className='ml-2'>&#10003;</button>
                            </div>
                        </div>
                    )
                })
                }

            </div>
        </>
    )
}
