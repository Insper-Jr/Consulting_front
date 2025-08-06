import { createBrowserRouter, Outlet } from "react-router-dom";
import exempleRoutes from "./pages/routes";
import ScrollToTop from "./components/scrollToTop";
import NotFoundPage from "./pages/notfound/NotFoundPage";

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
        element: <NotFoundPage />,
      },
    ],
  },
]);