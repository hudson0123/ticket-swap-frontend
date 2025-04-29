import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store'

export default function Navbar() {

    const router = useRouter()

    const current_user = useAuthStore((state) => state.current_user)

    // console.log(current_user)

    return (
        <>
            {current_user ? (
                <nav className="border-gray-200 bg-gray-900 fixed w-full border-b-2 z-99" >
                    <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                        </a>
                        <div className='flex justify-end items-center'>
                            <a href={"/" + current_user.username} className="invisible md:visible text-white hover:underline">@{current_user.username}</a>
                            <a href={"/" + current_user.username}><img className="w-10 h-10 border-3 ml-2 border-white rounded-full " src="/profile.svg" alt="user-profile" /></a>
                        </div>

                    </div>
                </nav>
            ) : (
                <nav className="border-gray-200 bg-gray-900 fixed w-full border-b-2 z-99">
                    <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                        </a>
                        <button onClick={() => router.push('/login')} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</button>
                    </div>
                </nav>
            )
            }
        </>
    )
}
