import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { HomeProvider } from '../../contexts/Home/HomeProvider'

export const NotFound = () => {
    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <h1>Página não encontrada</h1>
                <Footer />
            </HomeProvider>
        </div>
    )
}