import { Suspense, lazy, useEffect } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { initOneSignal } from '../../libs/oneSignal.config';
import LoginWithSocialMidiaModal from '../../modals/LoginWithSocialMidiaModal';
import { Loading } from '../../components/atoms/Loading/Loading';

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
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
