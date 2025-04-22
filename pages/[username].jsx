import api from '@/api'
import { useAuthStore, useNotifyStore } from '@/store'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ExpandableSection from '@/components/ExpandableSection'
import ContactInfoSection from '@/components/ContactInfoSection'
import AccountInfoSection from '@/components/AccountInfoSection'
import NotificationsSection from '@/components/NotificationsSection'
import AccountCard from '@/components/AccountCard'
import AccountCardLoading from '@/components/AccountCardLoading'
import AdminRequestList from '@/components/AdminRequestList'
import RequestsSection from '@/components/RequestsSection'

export default function AccountPage() {
  const [boxExpanded, setBoxExpanded] = useState("0")
  const current_user = useAuthStore((state) => state.current_user)
  const handleLogout = useAuthStore((state) => state.logout)
  const router = useRouter()
  const username = router.query.username
  const [accountUser, setAccountUser] = useState(null)

  const handleExpand = (box) => setBoxExpanded(box)
  const dummyFunction = () => console.log("Changed Input")

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        await useAuthStore.getState().refreshCurrentUser()
        try {
          const user_res = await api.get("/api/users/" + username + "/")
          setAccountUser(user_res.data)
        } catch (error) {
          useNotifyStore.getState().setNotification("error", "404 This is not a user account.")
        }
      }
    }

    fetchUserData()
  }, [username])

  return (
    <>
      {current_user && accountUser ? (
        <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] m-5 mt-20 md:m-20 md:gap-20 h-fit'>
          <AccountCard accountUser={accountUser} currentUser={current_user} />
          {current_user.id === accountUser.id && (
            <div className="flex flex-col gap-2 justify-center items-center py-10">
              <ExpandableSection id="4" title="Account Information" boxExpanded={boxExpanded} handleExpand={handleExpand}>
                <AccountInfoSection accountUser={accountUser} onChange={dummyFunction} handleLogout={handleLogout} />
              </ExpandableSection>

              <ExpandableSection id="1" title="Notifications" boxExpanded={boxExpanded} handleExpand={handleExpand}>
                <NotificationsSection />
              </ExpandableSection>

              <ExpandableSection id="3" title="Requests" boxExpanded={boxExpanded} handleExpand={handleExpand}>
                <div>
                  <RequestsSection accountUser={accountUser} />
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
