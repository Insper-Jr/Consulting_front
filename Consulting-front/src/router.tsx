import { createBrowserRouter, Outlet } from "react-router-dom";
import exempleRoutes from "./pages/routes";
import ScrollToTop from "./components/scrollToTop";

const Layout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...exempleRoutes,
      {
        path: "*",
        element: <p style={{ padding: "20px", fontSize: "32px", fontWeight: "500" }}>Em construção... 🧱</p>,
      },
    ],
  },
]);