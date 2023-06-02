import { lazy } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    return (
        <HomeProvider>
            <Header />
            <Main />
            <Footer />
        </HomeProvider>
    )
}
