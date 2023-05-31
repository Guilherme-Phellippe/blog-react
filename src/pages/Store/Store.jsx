import { lazy } from "react"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Store() {
    return (
        <HomeProvider>
            <Header />
            <h1>Loja da tem sabor</h1>
            <Footer />
        </HomeProvider>
    )
}