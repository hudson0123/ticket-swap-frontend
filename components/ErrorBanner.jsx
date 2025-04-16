import React from 'react'
import { useErrorStore } from '@/store'

export default function ErrorBanner() {

    const home_error = useErrorStore((state) => state.error)
    const clear_error = useErrorStore((state) => state.clearError)
    console.log("ERROR: " + home_error)

    return (
        <>
            {home_error !== null && (
                <div className="flex flex-col-1 px-3 py-1  bg-red-400">
                    <p className="text-black">{home_error}</p>
                    <button className="ml-auto font-bold" onClick={clear_error}>x</button>
                </div>
            )
            }
        </>
    )
}
