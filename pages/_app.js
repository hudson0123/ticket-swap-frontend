import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/router'
import { PROTECTED_ROUTES } from "@/constants";
import Navbar from "@/components/Navbar";
import NotifyBanner from "@/components/NotifyBanner";

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const isProtected = PROTECTED_ROUTES.includes(router.pathname)


  return isProtected ? (
    <ProtectedRoute>
      <Navbar />
      <div className="pt-10"></div>
      <NotifyBanner />
      <Component {...pageProps} />
    </ProtectedRoute>
  ) : (
    <>
      <Navbar />
      <div className="pt-10"></div>
      <NotifyBanner />
      <Component {...pageProps} />
    </>
  )
}
