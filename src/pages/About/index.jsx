import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const About = () => {
    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <h1>Sobre nós</h1>
                <Footer />
            </HomeProvider>
        </div>
    )
}