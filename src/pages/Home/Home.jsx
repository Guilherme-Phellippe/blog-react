import { Suspense, lazy, useEffect } from "react";

import { HomeProvider } from "../../contexts/Home/HomeProvider";
import { Loading } from "../../components/atoms/Loading/Loading";
import { initOneSignal } from "../../libs/oneSignal.config.js"
import LoginWithSocialMidiaModal from "../../modals/LoginWithSocialMidiaModal";

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const MainContentHome = lazy(() => import("../../components/templates/MainContentHome"))
const CookieConsent = lazy(() => import("react-cookie-consent"))


export default function Home() {

  useEffect(() => {
    initOneSignal();
  }, [])


  return (
    <HomeProvider>
      <Header />
      <Suspense fallback={<Loading />}>
        <MainContentHome />
        <Footer />
        <LoginWithSocialMidiaModal />
        <CookieConsent
          buttonWrapperClasses="w-full md:w-auto flex justify-center items-center mb-8 md:mb-0"
          location="bottom"
          buttonText="Aceito"
          buttonClasses="text-s1_3 font-bold w-1/2 md:w-auto md:px-8"
          cookieName="cookie-tem-sabor"
          expires={500}
        >
          <p className="text-s1_7 text-center leading-10 text-white pt-4">
            A tem sabor está em conformidade com a GDPR e a CCPA e usa cookies para melhorar a sua experiência dentro do blog.
            Ao continuar navegando, você concorda com o uso de cookies, GDPR, CCPA,
            <a className="text-yellow-500 hover:text-yellow-200 cursor-pointer " href="/policy"> Politicas de privacidade</a>,
            <a className="text-yellow-500 hover:text-yellow-200 cursor-pointer " href="/terms"> Termos de uso.</a>
          </p>
        </CookieConsent>
      </Suspense>
    </HomeProvider>
  );
}

