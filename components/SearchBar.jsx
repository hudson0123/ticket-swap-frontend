import React, {useState} from 'react'
import Image from 'next/image'

export default function SearchBar({searchTerm, setSearchTerm}) {

    const [toggleSearchBar, setToggleSearchBar] = useState("invisible")


    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSearchBar = () => {
        toggleSearchBar === "" ? setToggleSearchBar("invisible") : setToggleSearchBar("")
    }

    return (
        <div className="flex items-center gap-3 mx-5">
            <Image 
                width={10} 
                height={10}
                className="w-6 h-6 cursor-pointer fixed bottom-4 left-4"
                src="/search.svg"
                onClick={handleSearchBar}
                alt="Search icon"
            />
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className={`bg-gray-200 rounded-full p-2 px-4 flex-1 transition-all duration-300 ease-in-out ${toggleSearchBar}`}
                placeholder="Search..."
            />
        </div>
    )
}
