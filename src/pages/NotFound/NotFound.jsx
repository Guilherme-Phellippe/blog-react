import { lazy } from "react"
import { Link } from "react-router-dom"

import { Button } from "../../components/atoms/Button"
import { HomeProvider } from '../../contexts/Home/HomeProvider'

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function NotFound() {
    return (
        <HomeProvider>
            <Header />
            <div className="w-full h-[40rem] flex flex-col gap-8 justify-center items-center">
                <h2 className="text-s2">Página não encontrada! =(</h2>
                <Link to={'/'}>
                    <Button customClass={'underline text-s1_3'}>Voltar para home</Button>
                </Link>
            </div>
            <Footer />
        </HomeProvider>
    )
}
