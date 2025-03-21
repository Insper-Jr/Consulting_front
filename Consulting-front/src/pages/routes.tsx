import { redirect, RouteObject } from "react-router-dom"
import Home from "./home/home"

const routes: RouteObject[] = [{
    path: "/",
    element: <Home />,
}
]
export default routes