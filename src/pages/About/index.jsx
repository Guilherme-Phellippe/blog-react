import { lazy } from "react"
import { AboutMain } from "../../components/templates/AboutMain"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function About() {
    return (
        <HomeProvider>
            <Header />
            <AboutMain />
            <Footer />
        </HomeProvider>
    )
}