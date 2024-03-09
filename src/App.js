import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuth } from "./contexts/AuthContext";
import LocationsPage from "./pages/LocationsPage";
import SettingsPage from "./pages/SettingsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import "./App.css";

const loggedInRoutes = [
  {
    path: "/locations",
    element: <LocationsPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/locations" />,
  },
];

const notLoggedInRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
];

function App() {
  const { currentUser } = useAuth();

  const router = createBrowserRouter(
    !currentUser ? notLoggedInRoutes : loggedInRoutes
  );

  return <RouterProvider router={router} />;
}

export default App;
