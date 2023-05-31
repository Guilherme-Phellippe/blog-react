import { lazy } from "react"
import { PolicyMain } from "../../components/templates/PolicyMain"
import { TermsMain } from "../../components/templates/TermsMain"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Policy() {
    const url = new URL(window.location.href);
    const pathArray = url.pathname.split('/');
    const type = pathArray[pathArray.length - 1];

    return (
        <HomeProvider>
            <Header />
            {
                type === 'policy'
                    ?
                    <PolicyMain />
                    :
                    <TermsMain />
            }
            <Footer />
        </HomeProvider>
    )
}