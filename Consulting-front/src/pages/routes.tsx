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
import Tech from "./tech/tech"
import GamificacaoPage from "./tech/cases/gamificacaoPage"
import MedicinaPage from "./tech/cases/medicinaPage"
import WallePage from "./tech/cases/wallePage"
import Direito from "./direito/direito"
import AlicercePage from "./direito/cases/alicercePage"
import CarWashPage from "./direito/cases/carWashPage"
import PrintPage from "./direito/cases/printPage"
import Processos from "./processos/processos"
import Business from "./business/business"
import ExpansaoMercadoPage from "./business/cases/expansaoMercadoPage"
import GoToMarketPage from "./business/cases/goToMarketPage"
import EstruturaFinanceiraPage from "./business/cases/estruturaFinanceiraPage"
import OperacaoParaEscalarPage from "./business/cases/operacaoParaEscalarPage"
import Alumni from "./alumni/alumni"


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
    path: "/tech",
    element: <Tech />,
},
{
    path: "/tech/gamificacao",
    element: <GamificacaoPage />,
},
{
    path: "/tech/medicina",
    element: <MedicinaPage />,
},
{
    path: "/tech/wall-e",
    element: <WallePage />,
},
{
    path: "/direito",
    element: <Direito />,
},
{
    path: "/direito/alicerce",
    element: <AlicercePage />,
},
{
    path: "/direito/car-wash",
    element: <CarWashPage />,
},
{
    path: "/direito/print",
    element: <PrintPage />,
},
{
    path: "/processos",
    element: <Processos />,
},
{
    path: "/alumni",
    element: <Alumni />,
},
{
    path: "/business",
    element: <Business />,
},
{
    path: "/business/expansao-mercado",
    element: <ExpansaoMercadoPage />,
},
{
    path: "/business/go-to-market",
    element: <GoToMarketPage />,
},
{
    path: "/business/estrutura-financeira",
    element: <EstruturaFinanceiraPage />,
},
{
    path: "/business/operacao-para-escalar",
    element: <OperacaoParaEscalarPage />,
},
]
export default routes
