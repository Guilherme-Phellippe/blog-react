import { Suspense, lazy, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userProvider';
import { initOneSignal } from '../../libs/oneSignal.config';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import { Loading } from '../../components/atoms/Loading/Loading';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))
const LoginWithSocialMidiaModal = lazy(() => import('../../modals/LoginWithSocialMidiaModal'))

export default function Recipe() {
    const { user } = useContext(UserContext)

    useEffect(() => {
        window.location.hostname !== 'localhost' && window.addEventListener("load", () => initOneSignal())
    }, []);

    return (
        <HomeProvider>
            <Header user={user} />
            <Main user={user} />
            <Suspense fallback={<Loading />}><Footer /></Suspense>
            {/* MODAL LOGIN WITH SOCIAL MIDIA  */}
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
