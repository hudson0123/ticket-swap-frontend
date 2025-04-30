import React from 'react'
import Image from 'next/image'

export default function AccountCard({ accountUser, currentUser }) {
    return (
        <div className="relative w-full max-w-md rounded-2xl border-2 border-white bg-gradient-to-br from-[#1e1e2f] to-[#2c2c3f] px-6 py-12 text-white shadow-lg">
            <div className="flex flex-col items-center text-center">
                <Image 
                    width={10} 
                    height={10}
                    className="w-24 h-24 border-2 border-white rounded-full mb-4"
                    src="/profile.svg"
                    alt="Profile"
                />
                <h2 className="text-xl font-semibold">
                    LOADING USER
                </h2>
                <p className="text-sm text-gray-300">@loading</p>
                <div className="mt-6 space-y-2">
                    <p className="italic text-gray-400">"We are current getting the data from our servers. Thank you for your patience."</p>
                </div>
            </div>
        </div>
    )
}