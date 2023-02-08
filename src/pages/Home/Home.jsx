import { useMemo } from "react";
import { Footer } from "../../components/templates/Footer/Footer";
import { Header } from "../../components/templates/Header/Header";
import { Main } from "../../components/templates/Home/Main";
import { HomeProvider } from "../../contexts/Home/HomeProvider";

export default function Home() {
  return (
    <div className="container">
      <HomeProvider>
        {useMemo(() => {
          return <>
            <Header />
            <Main />
            <Footer />
          </>
        }, [])}
      </HomeProvider>
    </div>
  );
}

