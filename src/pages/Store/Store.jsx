import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const Store = () => {
    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <h1>Loja da tem sabor</h1>
                <Footer />
            </HomeProvider>
        </div>
    )
}