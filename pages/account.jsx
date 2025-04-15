import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function account() {

  const [boxExpanded, setBoxExpanded] = useState("0")
  const router = useRouter()

  const handleExpand = (box) => {
    setBoxExpanded(box)
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

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
          None
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
          <button className="hover:underline" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}