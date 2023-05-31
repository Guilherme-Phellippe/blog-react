import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { MainCreateTip } from '../../components/templates/MainCreateTip'
import { lazy } from 'react'

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function CreateTip() {
    return (
        <HomeProvider>
            <Header />
            <MainCreateTip />
            <Footer />
        </HomeProvider>
    )
}