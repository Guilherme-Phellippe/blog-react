import { lazy } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Main } from '../../components/templates/RecipeMain';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))


export default function Recipe() {
    return (
        <HomeProvider>
            <Header />
            <Main />
            <Footer />
        </HomeProvider>
    )
}
