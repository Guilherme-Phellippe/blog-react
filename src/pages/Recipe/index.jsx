import { lazy, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userProvider';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import { initOneSignal } from '../../libs/oneSignal.config';

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))
const LoginWithSocialMidiaModal = lazy(() => import('../../modals/LoginWithSocialMidiaModal'))

export default function Recipe() {
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (window.location.hostname !== 'localhost') {
            // Loading the oneSignal config
            initOneSignal();

            // Create script to Google Adsense and load to ad to display
            if (!window.hasAdsenseScriptHead) {
                const script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4781060024956035';
                script.async = true;
                document.head.appendChild(script);


                console.log("Adding ads on container adsbygoogle")
                (window.adsbygoogle = window.adsbygoogle || []).push({});

                window.hasAdsenseScriptHead = true;
            }
        }
    }, []);

    return (
        <HomeProvider>
            <Header user={user} />
            <Main user={user} />
            <Footer />
            {/* MODAL LOGIN WITH SOCIAL MIDIA  */}
            <LoginWithSocialMidiaModal />
        </HomeProvider>
    )
}
