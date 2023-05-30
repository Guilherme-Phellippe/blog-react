import { HomeProvider } from "../../contexts/Home/HomeProvider"
import { Header } from "../../components/templates/Header/Header"
import { Footer } from "../../components/templates/Footer/Footer"
import { ContactMain } from "../../components/templates/ContactMain"


export default function Contact() {
    return (
        <HomeProvider>
            <Header />
            <ContactMain />
            <Footer />
        </HomeProvider>
    )
}