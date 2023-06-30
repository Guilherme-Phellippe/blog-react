import { lazy, useEffect, useState } from 'react';
import { HomeProvider } from '../../contexts/Home/HomeProvider'

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))
const Main = lazy(() => import('../../components/templates/RecipeMain'))

export default function Recipe() {
    const [showContentAfterScroll, setShowContentAfterScroll] = useState(false)

    useEffect(() => {
        //THIS CODE IS SHOW SECTION IF USER SCROLLING PAGE
        const handleScroll = () => {
            console.log(window.scrollY)
            if (window.scrollY > 20) setShowContentAfterScroll(true)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <HomeProvider>
            <Header />
            <Main showContentAfterScroll={showContentAfterScroll} />

            {
                showContentAfterScroll && <Footer />
                
            }
        </HomeProvider>
    )
}
