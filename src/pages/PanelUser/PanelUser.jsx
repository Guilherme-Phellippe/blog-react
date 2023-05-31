import { lazy } from 'react'

import { HomeProvider } from '../../contexts/Home/HomeProvider'
import { MainUserPanel } from "../../components/templates/MainUserPanel"
import { UserPanelHeader } from '../../components/templates/UserPanelHeader'

const Footer = lazy(() => import("../../components/templates/Footer/Footer"))


export default function PanelUser() {
    return (
        <HomeProvider>
            <UserPanelHeader />
            <MainUserPanel />
            <Footer />
        </HomeProvider>
    )
}