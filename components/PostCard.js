import React from 'react'

export default function PostCard({ title, price, created_at }) {
    return (
        <div className="relative flex bg-white border-1 rounded-md w-full h-fit p-2 sm:p-5 mb-2">
            <img className="sm:h-10 sm:w-10 w-5 h-5 absolute top-3 right-2" src="/user.png"></img>
            <div className="h-20">
                <h1 className="font-semibold text-md sm:text-xl">{title}</h1>
                <p className="font-thin italic text-sm sm:text-lg">${price}</p>
                <p className="font-light mt-3 text-xs sm:text-sm sm:max-w-3/5">{created_at}</p>
            </div>
        </div>
    )
}
