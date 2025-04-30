import React from 'react'
import { useState, useEffect } from 'react'
import api from '@/api'
import Image from 'next/image'

export default function AdminRequestList() {

    const [users, setUsers] = useState([])
    const [requests, setRequests] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const users_res = await api.get('api/users')
                const requests_res = await api.get('api/requests')

                setUsers(users_res.data)
                setRequests(requests_res.data)
            } catch (e) {
                alert(e)
            }
        }
        fetchData()
    }, []);

    function getUsernamebyId(id) {
        const user = users.find(u => u.id === id)
        return user ? user.username : "Loading..."
    }

    return (
        <div className="bg-white border-2 border-gray-500 w-full lg:w-2/3 flex flex-col h-[90vh] rounded-2xl shadow-md">
            <div className="flex flex-col items-left ml-10 py-6">
                <h2 className="font-bold text-3xl mb-1">Request List</h2>
                <h3 className="font-thin">{requests.length} total</h3>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg mx-10 my-0">
                <div className="flex items-center mb-2 md:mb-0">
                    <Image width={10} height={10} className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
                    <span className="font-bold">Sender</span>
                </div>
                <div className="flex flex-col font-bold md:flex-row md:gap-37 text-sm md:text-base">
                    <span>Recipient</span>
                    <span>Sent At</span>
                    <span>Status</span>
                </div>
            </div>
            <hr className="hidden md:block" />
            <div className="flex flex-col p-4 sm:p-6 md:p-10 rounded-xl overflow-y-auto max-h-[80vh]">

                <div className="space-y-4">
                    {requests.map(request => (
                        <div key={request.id} className="flex flex-col md:flex-row md:items-center justify-between p-2 rounded-lg">
                            <div className="flex items-center mb-2 md:mb-0">
                                <Image width={10} height={10} className="w-10 h-10 mr-4" src="/user.png" alt="User icon" />
                                <span className="font-bold">{getUsernamebyId(request.sender)}</span>
                            </div>
                            <div className="flex flex-col md:flex-row md:gap-34 text-sm md:text-base mr-5">
                                <span>{getUsernamebyId(request.recipient)}</span>
                                <span>{request.sent_at.slice(5,10)}</span>
                                <span>{request.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
