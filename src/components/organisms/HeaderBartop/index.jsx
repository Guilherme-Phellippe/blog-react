import { Logo } from '../../atoms/HeaderLogo';
import { Search } from "../../molecules/HeaderSearch/Search"
import { SocialMidia } from "../../atoms/HeaderSocialMidia"

import './styles.css'

export const Bartop = () => {
    return (
        <div className="container-bar-top">
            <Logo />
            <Search />
            <SocialMidia />
        </div>
    )
}