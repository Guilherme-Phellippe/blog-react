import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Header } from '../../components/templates/Header/Header'
import { Footer } from '../../components/templates/Footer/Footer'
import { MainCreateTip } from '../../components/templates/MainCreateTip'

export default function CreateTip() {
    return (
        <HomeProvider>
            <Header />
            <MainCreateTip />
            <Footer />
        </HomeProvider>
    )
}