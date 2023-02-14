import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Header } from '../../components/templates/Header/Header'
import { Footer } from '../../components/templates/Footer/Footer'

export const CreateRecipe = () => { 
    return(
        <div className="container">
            <HomeProvider>
                <Header />
                <h1>1</h1>
                <Footer />
            </HomeProvider>
        </div>
    )
}