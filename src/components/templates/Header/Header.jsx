import { Bartop } from '../../organisms/HeaderBartop'
import { Menu } from '../../organisms/HeaderMenu/Menu'

import './header.css'

export const Header = () => {
    return (
        <header>
            <Bartop />
            <Menu />
        </header>
    )
}