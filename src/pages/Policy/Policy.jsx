import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { PolicyMain } from "../../components/templates/PolicyMain"
import { TermsMain } from "../../components/templates/TermsMain"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const Policy = () => {
    const url = new URL(window.location.href);
    const pathArray = url.pathname.split('/');
    const type = pathArray[pathArray.length - 1];


    return (
        <HomeProvider>
            <Header />
            {
                type === 'policy' 
                ?
                <PolicyMain />
                :
                <TermsMain />
            }
            <Footer />
        </HomeProvider>
    )
}