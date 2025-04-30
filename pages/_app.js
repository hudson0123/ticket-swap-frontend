import "@/styles/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from 'next/router'
import { PROTECTED_ROUTES } from "@/constants";
import Navbar from "@/components/Navbar";
import NotifyBanner from "@/components/NotifyBanner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import ReactQuery client
const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {

  const router = useRouter()

  // List of protected routes.
  const isProtected = PROTECTED_ROUTES.includes(router.pathname)

  // A generic component that handles conditional protected route.
  const ConditionalWrapper = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;


  return (
    <QueryClientProvider client={queryClient}>
      {/* If the condition is met the ProtectedRoute will render. */}
      <ConditionalWrapper
        condition={isProtected}
        wrapper={children => <ProtectedRoute>{children}</ProtectedRoute>}
      >
        <Navbar />
        <NotifyBanner />
        <Component {...pageProps} />
      </ConditionalWrapper>
    </QueryClientProvider>
  )
}
