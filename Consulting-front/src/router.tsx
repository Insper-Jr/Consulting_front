import { createBrowserRouter } from "react-router-dom";
import exempleRoutes from "./pages/routes"

export const router = createBrowserRouter([
  ...exempleRoutes,
  {
    path: "/",
    element: <p style={{padding: "20px", fontSize: "32px", fontWeight: "500"}}>Em construção... 🧱</p>,
  },
]);