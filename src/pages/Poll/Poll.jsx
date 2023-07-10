import { lazy } from "react"

import { HomeProvider } from "../../contexts/Home/HomeProvider"

import MainPoll from "../../components/templates/MainPoll"
import LoginWithSocialMidiaModal from "../../modals/LoginWithSocialMidiaModal"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Poll() {
    return (
        <HomeProvider>
            <Header />
            <MainPoll />
            <Footer />
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
