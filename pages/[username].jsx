import api from '@/api'
import AccountCard from '@/components/AccountCard'
import AccountCardLoading from '@/components/AccountCardLoading'
import AccountInfoSection from '@/components/AccountInfoSection'
import ExpandableSection from '@/components/ExpandableSection'
import RequestsSection from '@/components/RequestsSection'
import { useAuthStore, useNotifyStore } from '@/store'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AccountPage() {
  const [boxExpanded, setBoxExpanded] = useState("0")
  const handleLogout = useAuthStore((state) => state.logout)
  const router = useRouter()
  const username = router.query.username
  const current_user_data = useAuthStore((state) => state.current_user)

  const handleExpand = (box) => setBoxExpanded(box)
  const dummyFunction = () => console.log("Changed Input")


  const {data: account_user_data, isPending, error} = useQuery({
    queryKey: ['account_user', username],
    queryFn: async () => {
      if (!username) return null;
      const res = await api.get(`/api/users/${username}/`);
      return res.data;
    },
    enabled: !!username,
  })

  if (isPending) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit'>
        <AccountCardLoading />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p className='text-red-500 flex justify-center mt-5 text-sm'>We were unable to access this acount or it does not exist.</p>
      </div>
    )
  }


  return (
    <>
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
    </>
  )
}
