import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Header } from '../../components/templates/Header/Header'
import { Footer } from '../../components/templates/Footer/Footer'
import { MainCreateRecipe } from '../../components/templates/MainCreateRecipe'

export const CreateRecipe = () => {
    return (
        <HomeProvider>
            <Header />
            <MainCreateRecipe />
            <Footer />
        </HomeProvider>
    )
}