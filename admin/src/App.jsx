// import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

import { Routes } from "react-router"
import { useAuth } from "@clerk/react"
import PageLoader from "./components/PageLoader"

function App() {
  return (
    <>

      const {isSignedIn, isLoaded} = useAuth();

      if (!isLoaded) return <PageLoader />;



      <Routes>
        <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"} /> : <LoginPage />} />
        <Route path="/" element={isSignedIn ? <DashboardLayout /> : <Navigate to={"/login"} />}>
          <Route index element={<Navigate to={"dashboard"} />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="customers" element={<CustomersPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App