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
        cookieName="cookie-tem-sabor"
        expires={500}
      >
        <p className="text-s1_5 text-white">
          A tem sabor usa cookies para melhorar a sua experiência dentro do blog. Ao continuar navegando, você concorda com o uso de cookies.
        </p>
      </CookieConsent>

    </HomeProvider>
  );
}

