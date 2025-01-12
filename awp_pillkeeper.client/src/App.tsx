import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignInPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
