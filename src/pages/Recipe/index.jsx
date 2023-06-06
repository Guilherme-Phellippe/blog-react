import { Suspense, lazy, useEffect, useState } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Loading } from '../../components/atoms/Loading/Loading';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    const [showContentAfterScroll, setShowContentAfterScroll] = useState(false)

    useEffect(() => {
        const handleScroll = () => window.scrollY > 150 && setShowContentAfterScroll(true)

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <HomeProvider>
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Main showContentAfterScroll={showContentAfterScroll} />
            </Suspense>
            {
                showContentAfterScroll &&
                <>
                    <Footer />
                </>
            }
        </HomeProvider>
    )
}
