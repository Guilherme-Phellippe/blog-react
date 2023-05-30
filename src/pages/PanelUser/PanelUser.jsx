import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Footer } from "../../components/templates/Footer/Footer"
import { MainUserPanel } from "../../components/templates/MainUserPanel"
import { UserPanelHeader } from '../../components/templates/UserPanelHeader'


export default function PanelUser() {
    return (
        <HomeProvider>
            <UserPanelHeader />
            <MainUserPanel />
            <Footer />
        </HomeProvider>
    )
}