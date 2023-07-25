import { lazy, useEffect } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { initOneSignal } from '../../libs/oneSignal.config';
import LoginWithSocialMidiaModal from '../../modals/LoginWithSocialMidiaModal';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    useEffect(() => {
        initOneSignal();
    }, []);


    return (
        <HomeProvider>
            <Header />
            <Main />
            <Footer />
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
