import { AboutMain } from "../../components/templates/AboutMain"
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const About = () => {
    return (
        <HomeProvider>
            <Header />
            <AboutMain />
            <Footer />
        </HomeProvider>
    )
}