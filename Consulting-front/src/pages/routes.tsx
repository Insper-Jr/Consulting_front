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
import About_Us from "./about_us/about_us"
import Creation from "./creation/creation"
import Join from "./join/join"
import Overview from "./overview/overview"
import Strategy from "./strategy/strategy"
import Protection from "./protection/protection"
import Processos from "./processos/processos"


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
    path: "/about",
    element: <About_Us />,
},
{
    path: "/overview",
    element: <Overview />,
},
{
    path: "/creation",
    element: <Creation />,
},
{
    path: "/strategy",
    element: <Strategy />,
},
{
    path: "/protection",
    element: <Protection />,
},
{
    path: "/join",
    element: <Join />,
},
{
    path: "/processos",
    element: <Processos />,
},

]
export default routes
