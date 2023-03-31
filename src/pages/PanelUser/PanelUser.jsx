import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { Footer } from "../../components/templates/Footer/Footer"
import { MainUserPanel } from "../../components/templates/MainUserPanel"
import { UserPanelHeader } from '../../components/templates/UserPanelHeader'

export const PanelUser = () => {
    return (
        <HomeProvider>
            <UserPanelHeader />
            <MainUserPanel />
            <Footer />
        </HomeProvider>
    )
}