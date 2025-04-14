import React from 'react'
import AdminUserList from '@/components/AdminUserList'
import { useState } from 'react';
import AdminPostList from '@/components/AdminPostList';
import AdminRequestList from '@/components/AdminRequestList';

export default function panel() {

    const [adminView, setAdminView] = useState("users")

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-10">
            <div className="bg-white border-2 border-gray-500 w-full lg:w-1/3 flex flex-col items-center p-6 rounded-2xl shadow-md">
                <div className="">
                    <h1 className="font-inter font-bold text-4xl">Admin Panel</h1>
                    
                </div>
                <div>

                    <div className="flex flex-col gap-y-10 space-y-2 text-center mt-20">
                        <hr></hr>       
                        <button onClick={() => setAdminView("users")} className="block pointer hover:underline">User List</button>
                        <hr></hr>     
                        <button onClick={() => setAdminView("posts")} className="block hover:underline">Post List</button>
                        <hr></hr>     
                        <button onClick={() => setAdminView("requests")} className="block hover:underline">Request List</button>
                        <hr></hr>     
                    </div>
                </div>
            </div>
            {/* <AdminUserList/> */}
            {adminView === "users" ? <AdminUserList/> : adminView === "posts" ? <AdminPostList/> : adminView === "requests" ? <AdminRequestList/> : NA }
        </div>
    );
}