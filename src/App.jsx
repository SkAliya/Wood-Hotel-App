import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "../src/pages/Dashboard";
import Bookings from "../src/pages/Bookings";
import Cabins from "../src/pages/Cabins";
import Settings from "../src/pages/Settings";
import Login from "../src/pages/Login";
import Account from "../src/pages/Account";
import Users from "../src/pages/Users";
import PageNotFound from "../src/pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// const queryClient = new QueryClient()
// or with options also like defult ops
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 2 * 1000,
      // if no stale no waiting for feching immd fetcched
    },
  },
});
<Toaster
  position="top-center"
  gutter={12}
  containerStyle={{ margin: "8px" }}
  toastOptions={{
    success: {
      duration: 6000,
    },
    error: {
      duration: 7000,
    },
    style: {
      fontSize: "16px",
      maxWidth: "500px",
      padding: "16px 24px",
      backgroundColor: "var(--color-grey-0)",
      color: "var(--color-grey-700)",
    },
  }}
/>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/account" element={<Account />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
