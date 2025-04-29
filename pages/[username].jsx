import api from '@/api'
import AccountCard from '@/components/AccountCard'
import AccountCardLoading from '@/components/AccountCardLoading'
import AccountInfoSection from '@/components/AccountInfoSection'
import ExpandableSection from '@/components/ExpandableSection'
import RequestsSection from '@/components/RequestsSection'
import { useAuthStore, useNotifyStore } from '@/store'
import { useQueries } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'

export default function AccountPage() {
  const [boxExpanded, setBoxExpanded] = useState("0")
  const handleLogout = useAuthStore((state) => state.logout)
  const router = useRouter()
  const username = router.query.username

  const handleExpand = (box) => setBoxExpanded(box)
  const dummyFunction = () => console.log("Changed Input")


  const results = useQueries({
    queries: [
      {
        queryKey: ['account_user', username],
        queryFn: async () => {
          if (!username) return null;
          const res = await api.get(`/api/users/${username}/`);
          return res.data;
        },
        enabled: !!username,
      },
      {
        queryKey: ['current_user'],
        queryFn: async () => {
          const current_user = await api.get('/api/current-user/')
          return current_user.data
        }
      }
    ]
  }
  )

  const { data: account_user_data, error: account_user_error, isPending: account_user_pending } = results[0]
  const { data: current_user_data, error: current_user_error, isPending: current_user_pending } = results[1]

  if (account_user_pending || current_user_pending) {
    return (
      <div className='flex justify-center items-center h-[80vh]'>
        <CircularProgress size="5rem" />
      </div>
    )
  }

  if (account_user_error || current_user_error) {
    
    return
  }


  return (
    <>
      {current_user_data && account_user_data ? (
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit'>
          <AccountCard accountUser={account_user_data} currentUser={current_user_data} />
          {current_user_data.id === account_user_data.id && (
            <div className="flex flex-col gap-2 justify-center items-center py-10">
              <ExpandableSection id="4" title="Account Information" boxExpanded={boxExpanded} handleExpand={handleExpand}>
                <AccountInfoSection accountUser={account_user_data} onChange={dummyFunction} handleLogout={handleLogout} />
              </ExpandableSection>

              <ExpandableSection id="3" title="Requests" boxExpanded={boxExpanded} handleExpand={handleExpand}>
                <div>
                  <RequestsSection accountUser={account_user_data} />
                </div>
              </ExpandableSection>
            </div>
          )}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit'>
          <AccountCardLoading />
        </div>
      )}
    </>
  )
}
