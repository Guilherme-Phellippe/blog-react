
import { Logo } from './childs/Bartop/Logo'
import { Search } from './childs/Bartop/Search'
import { SocialMidia } from './childs/Bartop/SocialMidia'
import { Menu } from './childs/Menu/Menu'

import './header.css'

export const Header = ({ setValueSearch }) => {

    return (
        <header>
            <div className="container-bar-top">
                <Logo />
                <Search setValueSearch={setValueSearch}/>
                <SocialMidia />
            </div>
            <Menu />
        </header>
    )
}