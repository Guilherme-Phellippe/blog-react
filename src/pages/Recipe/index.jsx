import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"

import { Main } from '../../components/templates/RecipeMain';

export const Recipe = () => {

    return (
        <HomeProvider>
            <Header />
            <Main />
            <Footer />
        </HomeProvider>
    )
}