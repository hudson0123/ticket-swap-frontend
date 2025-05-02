import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {

    const router = useRouter()
    const current_user = useAuthStore((state) => state.current_user)

    console.log(current_user)

    return (
        <>
            {/* If the user is logged in. */}
            {current_user ? (
                <nav className="border-gray-200 bg-gray-900 fixed w-full border-b-2 z-99" >
                    <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                        <Link href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                        </Link>
                        <div className='flex justify-end items-center'>
                            <Link href={"/" + current_user.username} className="invisible md:visible text-white hover:underline">@{current_user.username}</Link>
                            <Link href={"/" + current_user.username}><Image width={100} height={100} className="w-12 h-12 ml-2 rounded-full border-1 border-gray-300 hover:ring-1 ring-white transform duration-100" src={current_user.profile_picture ? current_user.profile_picture : "http://www.w3.org/2000/svg"} alt="user-profile" /></Link>
                        </div>

                    </div>
                </nav>
            ) : (
                <nav className="border-gray-200 bg-gray-900 fixed w-full border-b-2 z-99">
                    <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                        </Link>
                        <button onClick={() => router.push('/login')} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</button>
                    </div>
                </nav>
            )}
            <div className="pt-20"></div>
        </>
    )
}
