import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/router'
import { PROTECTED_ROUTES } from "@/constants";
import Navbar from "@/components/Navbar";
import ErrorBanner from "@/components/ErrorBanner";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  const isProtected = PROTECTED_ROUTES.includes(router.pathname)


  return isProtected ? (
    <ProtectedRoute>
      <Navbar />
      <div className="pt-20"></div>
      <ErrorBanner />
      <Component {...pageProps} />
    </ProtectedRoute>
  ) : (
    <>
      <Navbar />
      <div className="pt-20"></div>
      <Component {...pageProps} />
    </>
  )
}
