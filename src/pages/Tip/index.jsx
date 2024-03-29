import { HomeProvider } from '../../contexts/Home/HomeProvider'

import { TipMain } from '../../components/templates/TipMain';
import { lazy } from 'react';
import LoginWithSocialMidiaModal from '../../modals/LoginWithSocialMidiaModal';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Tip() {
    return (
        <HomeProvider>
            <Header />
            <TipMain />
            <Footer />
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
