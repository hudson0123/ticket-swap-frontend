import React from 'react'

export default function PostCard({ author, title, price, description }) {
    return (
        <div className="relative flex bg-white border-3 border-gray-500 rounded-md w-full h-fit p-5 mb-2">
            <img className="h-10 w-10 absolute top-2 right-2" src="/user.png"></img>
            <div>
                <h1 className="font-semibold text-xl">{title}</h1>
                <p className="font-thin italic">${price}</p>
                <p className="font-light mt-3 text-sm sm:max-w-3/5">{description != "" ? description : "No Description"}</p>
            </div>
        </div>
    )
}
