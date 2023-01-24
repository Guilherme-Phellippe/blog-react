import { FaGrinStars } from 'react-icons/fa'
import { Banner } from './childs/Banner/Banner'
import { Search } from './childs/Bartop/Search'
import { SocialMidia } from './childs/Bartop/SocialMidia'
import { Menu } from './childs/Menu/Menu'
import './header.css'

export const Header = () => {
    return (
        <header>
            <div className="container-bar-top">
                <div className="content-message">
                    <h2>Arrase na cozinha com a gente</h2>
                    <FaGrinStars />
                </div>
                <Search />
                <SocialMidia />
            </div>
            <Banner />
            <Menu />
        </header>
    )
}