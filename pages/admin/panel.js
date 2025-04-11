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
            {adminView === "users" ? <AdminUserList/> : adminView === "posts" ? <AdminPostList/> : adminView === "requests" ? <AdminRequestList/> : NA }
        </div>
    );
}

// <div className="font-light font-roboto m-5">
// <div className="
//     <h1 className="font-extrabold my-5">WEBSITE STATS</h1>
//     <span className="block">Users: <CountUp end={users.length} duration={2} /></span>
//     <span className="block">Posts: <CountUp end={posts.length} duration={2} /></span>                
//     <span className="block">Requests: <CountUp end={requests.length} duration={2} /></span>            
// </div>
// <div>
//     <h1 className="font-extrabold mt-5">USERS</h1>
//     {users.length === 0 ? (
//         <p>Loading...</p>
//     ) : (
//         <div className="grid grid-cols-3 gap-5 mr-30">
//             {users.map(user => (
//                 <div className="relative bg-gray-800 shadow-lg text-white m-10 p-5 w-full rounded-2xl">
//                     <h1 className="font-semibold">{user.first_name} {user.last_name} - Member since {user.date_joined.slice(0,10)}</h1>
//                     <h3>Total Posts: {posts.filter(post => post.author === user.id).length}</h3>
//                     <hr className="mb-5"></hr>
//                     <p>Email: {user.email}</p>
//                     {user.phone_number != null ? (
//                         <p>Phone: {user.phone_number}</p>
//                     ) : (
//                         <p> No Phone Numer</p>
//                     )}
//                     {user.snapchat != null ? (
//                         <p>Snapchat: {user.snapchat}</p>
//                     ) : (
//                         <p> No Snapchat</p>
//                     )}
//                     {user.instagram != null ? (
//                         <p>Instagram: {user.instagram}</p>
//                     ) : (
//                         <p> No Instagram</p>
//                     )}
//                     {user.groupme != null ? (
//                         <p>Groupme: {user.groupme}</p>
//                     ) : (
//                         <p> No Groupme</p>
//                     )}
//                     {user.discord != null ? (
//                         <p>Discord: {user.discord}</p>
//                     ) : (
//                         <p> No Discord</p>
//                     )}
//                 </div>
//             ))}
//         </div>
//     )}
// </div>
// </div>
