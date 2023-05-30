import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"

import { TipMain } from '../../components/templates/TipMain';


export default function Tip() {
    return (
        <HomeProvider>
            <Header />
            <TipMain />
            <Footer />
        </HomeProvider>
    )
}
