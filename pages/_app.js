import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/router'
import { PROTECTED_ROUTES } from "@/constants";
import Navbar from "@/components/Navbar";
import NotifyBanner from "@/components/NotifyBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const isProtected = PROTECTED_ROUTES.includes(router.pathname)


  return isProtected ? (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute>
        <Navbar />
        <div className="pt-20"></div>
        <NotifyBanner />
        <Component {...pageProps} />
      </ProtectedRoute>
    </QueryClientProvider>
  ) : (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <div className="pt-20"></div>
        <NotifyBanner />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}
