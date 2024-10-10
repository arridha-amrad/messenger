import useTheme from "@/hooks/useTheme";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { homeLoader } from "./loaders";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    loader: homeLoader,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export default function App() {
  useTheme();
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Something went wrong</p>}
    />
  );
}
