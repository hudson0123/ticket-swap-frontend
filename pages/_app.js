import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/router'
import { PROTECTED_ROUTES } from "@/constants";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const isProtected = PROTECTED_ROUTES.includes(router.pathname)

  function Logout() {
    localStorage.clear()
    router.push('/login')

  }

  function RegisterAndLogout() {
    localStorage.clear()
    router.push('/register')
  }

  return isProtected ? (
    <ProtectedRoute>
      <Component {...pageProps} />
    </ProtectedRoute>
  ) : (
  <Component {...pageProps} />
  )
}
