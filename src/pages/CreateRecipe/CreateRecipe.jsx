import { lazy } from 'react'

import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { MainCreateRecipe } from '../../components/templates/MainCreateRecipe'

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function CreateRecipe() {
    return (
        <HomeProvider>
            <Header />
            <MainCreateRecipe />
            <Footer />
        </HomeProvider>
    )
}