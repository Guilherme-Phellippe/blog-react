import { lazy, Suspense } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Loading } from '../../components/atoms/Loading/Loading';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    return (
        <HomeProvider>
            <Header />
            <Suspense fallback={<Loading />}>
                <Main />
                <Footer />
            </Suspense>
        </HomeProvider>
    )
}
