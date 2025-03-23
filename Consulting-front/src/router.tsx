import { createBrowserRouter } from "react-router-dom";
import exempleRoutes from "./pages/routes"

export const router = createBrowserRouter([
  ...exempleRoutes,
  {
    path: "/",
    element: <div>Home</div>,
  },
]);