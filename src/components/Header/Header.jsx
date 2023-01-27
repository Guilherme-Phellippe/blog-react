
import { Search } from './childs/Bartop/Search'
import { SocialMidia } from './childs/Bartop/SocialMidia'
import { Menu } from './childs/Menu/Menu'

import './header.css'

export const Header = ({ setValueSearch }) => {

    return (
        <header>
            <div className="container-bar-top">
                <div className="content-logo">
                    <img src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
                </div>
                <Search setValueSearch={setValueSearch}/>
                <SocialMidia />
            </div>
            <Menu />
        </header>
    )
}