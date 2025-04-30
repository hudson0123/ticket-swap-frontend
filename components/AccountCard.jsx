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
          {accountUser.first_name} {accountUser.last_name}
        </h2>
        <p className="text-sm text-gray-300">@{accountUser.username}</p>
        {accountUser.is_verified_uga && (
          <span className="absolute top-2 right-2 mt-2 inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
            Verified UGA Student
          </span>
        )}
      </div>

      <div className="mt-6 space-y-2">
        {accountUser.bio && (
          <p className="italic text-gray-400">"{accountUser.bio}"</p>
        )}
      </div>
      {currentUser.id === accountUser.id && (
        <div className="mt-8 border-t border-white/20 pt-4">
          <h3 className="mb-2 text-lg font-semibold underline">Contact Info</h3>
          <p className="text-sm">
            <span className="font-medium">Email:</span> {accountUser.email || 'N/A'}
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {accountUser.phone_number || 'N/A'}
          </p>
        </div>
      )}
    </div>
  )
}