import { lazy } from "react"

import { HomeProvider } from "../../contexts/Home/HomeProvider"
import { ContactMain } from "../../components/templates/ContactMain"
import LoginWithSocialMidiaModal from "../../modals/LoginWithSocialMidiaModal"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Contact() {
    return (
        <HomeProvider>
            <Header />
            <ContactMain />
            <Footer />
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}