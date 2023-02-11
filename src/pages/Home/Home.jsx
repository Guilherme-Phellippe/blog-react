import { useMemo } from "react";
import { Footer } from "../../components/templates/Footer/Footer";
import { Header } from "../../components/templates/Header/Header";
import { MainContentHome } from "../../components/templates/Home/MainContentHome";
import { HomeProvider } from "../../contexts/Home/HomeProvider";

export default function Home() {
  return (
    <div className="container">
      <HomeProvider>
        {useMemo(() => {
          return <>
            <Header />
            <MainContentHome />
            <Footer />
          </>
        }, [])}
      </HomeProvider>
    </div>
  );
}

