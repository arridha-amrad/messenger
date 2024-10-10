import useTheme from "@/hooks/useTheme";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { me } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    loader: async () => {
      const user = await me();
      return user;
    },
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
