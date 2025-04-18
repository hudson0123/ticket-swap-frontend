// import React, { useState, useEffect } from 'react'
// import api from '@/api'

// const [sent, setSent] = useState(null)
// const [received, setReceived] = useState(null)

// useEffect(() => {
//     const getRequestData = async () => {
//         sent_res = await api.post('api/request-batch/', {
//             "requests": accountUser.sent_requests
//         })
//         setSent(sent_res.data)
//         sent_res = await api.post('api/request-batch/', {
//             "requests": accountUser.received_requests
//         })
//         setReceived(sent_res.data)

//     }
//     getRequestData()
// }, [])


// export default function RequestsSection({ accountUser }) {
//     return (
//         <>
//             <div>
//                 {sent.map((request) => (
//                     <p>{request.status}</p>
//                 ))}
//             </div>
//             <div>
//                 {received.map((request) => (
//                     <p>{request.status}</p>
//                 ))}
//             </div>
//         </>
//     )
// }
