

import { Banner } from './childs/Banner'
import { BarTop } from './childs/BarTop'
import { Menu } from './childs/Menu'
import './header.css'

export const Header = () =>{
    return (
        <header>
            <BarTop />
            <Banner />
            <Menu />
        </header>
    )
}