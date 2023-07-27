import { Suspense, lazy, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userProvider';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import { Loading } from '../../components/atoms/Loading/Loading';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))
const LoginWithSocialMidiaModal = lazy(() => import('../../modals/LoginWithSocialMidiaModal'))

const initOneSignal = lazy(()=> import('../../libs/oneSignal.config'));

export default function Recipe() {
    const { user } = useContext(UserContext)

    useEffect(() => {
        window.location.hostname !== 'localhost' 
        && initOneSignal();
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
