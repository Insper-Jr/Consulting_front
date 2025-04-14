import { redirect, RouteObject } from "react-router-dom"
import Home from "./home/home"
import Marketing from "./marketing/marketing"
import Financial from "./financial/financial"
import Market from "./market/market"
import Operational from "./operational/operational"
import DevWeb from "./devweb/devweb"
import Data from "./dataAnalysis/dataAnalysis"
import Products from "./products/products"
import Contact from "./contact/contact"
import Overview from "./overview/overview"

const routes: RouteObject[] = [{
    path: "/",
    element: <Home />,
},
{
    path: "/marketing",
    element: <Marketing />,
},
{
    path: "/financial",
    element: <Financial />,
},
{
    path: "/market",
    element: <Market />,
},
{
    path: "/operational",
    element: <Operational />,
},
{
    path: "/devweb",
    element: <DevWeb />,
},
{
    path: "/data",
    element: <Data />,
},
{
  path: "/products",
  element: <Products />,
},
{
    path: "/contact",
    element: <Contact />,
},
{
    path: "/services",
    element: <Overview />,
}
]
export default routes
