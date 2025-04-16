import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store'

export default function account() {

  const [boxExpanded, setBoxExpanded] = useState("4")
  const current_user = useAuthStore((state) => state.current_user)
  console.log(current_user)


  const handleExpand = (box) => {
    setBoxExpanded(box)
  }

  const handleLogout = useAuthStore((state) => state.logout)

  return (
    <div className="flex flex-col gap-2 justify-center items-center py-10">
      <div className="flex flex-col bg-white w-[90vw] rounded px-5 py-2">
        <div className="relative flex items-center">
          <p className="">Notifications</p>
          <button onClick={() => boxExpanded === "1" ? handleExpand("0") : handleExpand("1")} className="ml-auto">
            <img src="dropdown.svg" alt="dropdown-icon" className={`h-10 w-10 transition-transform duration-150  ${boxExpanded === "1" ? 'rotate-180' : 'rotate-0'}`}></img>
          </button>
        </div>
        <div className={`overflow-y-hidden transition-max-height duration-150 ${boxExpanded === "1" ? 'max-h-screen mt-5' : 'max-h-0'}`}>
          None
        </div>
      </div>
      <div className="flex flex-col bg-white w-[90vw] rounded px-5 py-2">
        <div className="relative flex items-center">
          <p className="">Sent & Received Requests</p>
          <button onClick={() => boxExpanded === "2" ? handleExpand("0") : handleExpand("2")} className="ml-auto">
            <img src="dropdown.svg" alt="dropdown-icon" className={`h-10 w-10 transition-transform duration-150  ${boxExpanded === "2" ? 'rotate-180' : 'rotate-0'}`}></img>
          </button>
        </div>
        <div className={`overflow-y-hidden transition-max-height duration-150 ${boxExpanded === "2" ? 'max-h-screen mt-5' : 'max-h-0'}`}>
          None
        </div>
      </div>
      <div className="flex flex-col bg-white w-[90vw] rounded px-5 py-2">
        <div className="relative flex items-center">
          <p className="">Contact Information</p>
          <button onClick={() => boxExpanded === "3" ? handleExpand("0") : handleExpand("3")} className="ml-auto">
            <img src="dropdown.svg" alt="dropdown-icon" className={`h-10 w-10 transition-transform duration-150  ${boxExpanded === "3" ? 'rotate-180' : 'rotate-0'}`}></img>
          </button>
        </div>
        <div className={`overflow-y-hidden transition-max-height duration-150 ${boxExpanded === "3" ? 'max-h-screen mt-5' : 'max-h-0'}`}>
          <div className="mb-5">
            <label htmlFor="snapchat">Snapchat</label><br />
            <input type="text" id="snapchat" value={current_user.snapchat || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="instagram">Instagram</label><br />
            <input type="text" id="instagram" value={current_user.instagram || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="discord">Discord</label><br />
            <input type="text" id="discord" value={current_user.discord || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="groupme">GroupMe</label><br />
            <input type="text" id="groupme" value={current_user.groupme || ''} className="border rounded px-2 w-full" />
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-white w-[90vw] rounded px-5 py-2">
        <div className="relative flex items-center">
          <p className="">Account</p>
          <button onClick={() => boxExpanded === "4" ? handleExpand("0") : handleExpand("4")} className="ml-auto">
            <img src="dropdown.svg" alt="dropdown-icon" className={`h-10 w-10 transition-transform duration-150  ${boxExpanded === "4" ? 'rotate-180' : 'rotate-0'}`}></img>
          </button>
        </div>
        <div className={`overflow-y-hidden transition-max-height duration-150 ${boxExpanded === "4" ? 'max-h-screen mt-5' : 'max-h-0'}`}>
          <button className="block hover:underline" onClick={handleLogout}>Logout</button>

          <div className="mb-5">
            <label htmlFor="username">Username</label><br />
            <input type="text" id="username" value={current_user.username || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="first_name">First Name</label><br />
            <input type="text" id="first_name" value={current_user.first_name || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="last_name">Last Name</label><br />
            <input type="text" id="last_name" value={current_user.last_name || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="bio">Bio</label><br />
            <textarea id="bio" value={current_user.bio || ''} className="border rounded px-2 w-full"></textarea>
          </div>

          <div className="mb-5">
            <label htmlFor="phone_number">Phone Number</label><br />
            <input type="text" id="phone_number" value={current_user.phone_number || ''} className="border rounded px-2 w-full" />
          </div>

          <div className="mb-5">
            <label htmlFor="profile_picture">Profile Picture</label><br />
            <input type="file" id="profile_picture" accept="image/*" className="border rounded px-2 w-full" />
            {current_user.profile_picture && (
              <img src={current_user.profile_picture} alt="Profile" className="mt-2 h-24 rounded" />
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="is_verified_uga">UGA Verified: </label>
            <p>{current_user.is_uga_verified ? "Yes" : "No"}</p>
          </div>

          <div className="mb-5">
            <label htmlFor="email">Email</label><br />
            <input type="email" id="email" value={current_user.email || ''} className="border rounded px-2 w-full" readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}