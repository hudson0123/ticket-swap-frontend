import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ACCESS_TOKEN } from '@/constants'
import { useAuthStore } from '@/store'

export default function Navbar() {

    const router = useRouter()

    const auth_status = useAuthStore((state) => state.status)
    const current_user = useAuthStore((state) => state.current_user)

    return (
        <nav className="border-gray-200 bg-gray-900 fixed w-full border-b-2">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
                <a href={auth_status ? "/home" : "/"} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">UniSwap</span>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {auth_status ? (
                            <>
                                {current_user.is_staff && (
                                    <li>
                                        <a href="/admin/panel" className="block py-2 px-3 mr-8 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Admin Panel</a>
                                    </li>
                                )}
                                <li>
                                    <a href={"/" + current_user.username}><img className="w-10 h-10 border-3 mr-2 border-white rounded-full " src="/profile.svg" alt="user-profile" /></a>
                                </li>
                                <li>
                                    <a href={"/" + current_user.username} className="text-white hover:underline">@{current_user.username}</a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button onClick={() => router.push('/login')} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
