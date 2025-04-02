import { redirect, RouteObject } from "react-router-dom"
import Home from "./home/home"
import Marketing from "./marketing/marketing"
import Financial from "./financial/financial"
import Market from "./market/market"

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
}
]
export default routes