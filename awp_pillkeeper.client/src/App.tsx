import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import { UserProvider } from "./contexts/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignInPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <GoogleOAuthProvider clientId="520949022369-tcpujq7vumpvam9ealoretc6c66odjj2.apps.googleusercontent.com">
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
