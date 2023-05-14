import { useMemo } from "react";
import { Footer } from "../../components/templates/Footer/Footer";
import { Header } from "../../components/templates/Header/Header";
import { MainContentHome } from "../../components/templates/Home/MainContentHome";
import { HomeProvider } from "../../contexts/Home/HomeProvider";
import CookieConsent from "react-cookie-consent";

export default function Home() {
  return (
    <HomeProvider>
      {useMemo(() => {
        return <>
          <Header />
          <MainContentHome />
          <Footer />
        </>
      }, [])}
      <CookieConsent
        location="bottom"
        buttonText="Aceito"
        buttonClasses="text-s1_2"
        cookieName="cookie-tem-sabor"
        expires={500}
      >
        <p className="text-s1_7 text-center leading-10 text-white py-8">
          A tem sabor está em conformidade com a GDPR e a CCPA e usa cookies para melhorar a sua experiência dentro do blog. 
          Ao continuar navegando, você concorda com o uso de cookies, GDPR, CCPA,
          <a className="text-yellow-500 hover:text-yellow-200 cursor-pointer " href="/policy"> Politicas de privacidade</a>,
          <a className="text-yellow-500 hover:text-yellow-200 cursor-pointer "href="/terms"> Termos de uso.</a>
        </p>
      </CookieConsent>

    </HomeProvider>
  );
}

