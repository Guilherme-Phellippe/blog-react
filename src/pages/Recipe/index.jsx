import { lazy, useContext, useEffect } from 'react';
import { HomeContext } from '../../contexts/Home/HomeProvider'
import { UserContext } from '../../contexts/userProvider';
import { initOneSignal } from '../../libs/oneSignal.config';
import LoginWithSocialMidiaModal from '../../modals/LoginWithSocialMidiaModal';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    const { setValueSearch } = useContext(HomeContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        window.location.hostname !== 'localhost' && initOneSignal();
    }, []);

    return (
        <>
            <Header setValueSearch={setValueSearch} user={user} />
            <Main setValueSearch={setValueSearch} user={user} />
            <Footer />
            {/* MODAL LOGIN WITH SOCIAL MIDIA  */}
            <LoginWithSocialMidiaModal />
        </>
    )
}
