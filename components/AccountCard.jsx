import React from 'react'
import Image from 'next/image'

export default function AccountCard({ accountUser, currentUser }) {

  const handleFileUpload = async () => {
    await api.post('/api/users/file-upload/', {
      
    })
  }

  return (
    <div className="relative w-full max-w-md max-h-fit rounded-2xl border-2 border-white bg-gradient-to-br from-[#1e1e2f] to-[#2c2c3f] px-6 py-12 text-white shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className='relative group'>
          <Image
            width={100}
            height={100}
            quality={100}
            className="w-24 h-24 fill rounded-full mb-4 aspect-square group-hover:opacity-30 group-hover:border-0 transform duration-200"
            src={accountUser.profile_picture ? accountUser.profile_picture : "/profile.svg"}
            alt="Profile"
          />
          <form method="POST">
            <input onChange={handleFileUpload} type="file" accept="image/png, image/jpeg, image/jpg"></input>
          </form>
          <p className='absolute top-12 font-semibold group-hover:opacity-100 opacity-0 transform duration-200 text-xs'>Upload Picture</p>
        </div>
        <h2 className="text-xl font-semibold">
          {accountUser.first_name} {accountUser.last_name}
        </h2>
        <p className="text-sm text-gray-300">@{accountUser.username}</p>
        {accountUser.is_verified_uga && (
          <span className="absolute top-2 right-2 mt-2 inline-block rounded-full bg-green-600 px-3 py-1 text-2xs font-medium text-white">
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