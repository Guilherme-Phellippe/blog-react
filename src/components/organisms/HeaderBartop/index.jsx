import { Logo } from '../../atoms/HeaderLogo';
import { Search } from "../../molecules/HeaderSearch/Search"
import { SocialMidia } from "../../atoms/HeaderSocialMidia"

export const Bartop = () => {
    return (
        <div className="bg-color_orange w-full max-w-[1500px] h-[60px] flex justify-between items-center order-2 md:order-1">
            <div className="w-1/5 h-full hidden md:flex justify-center">
                <Logo />
            </div>
            <Search width={'w-full'} />
            <SocialMidia hidden={'hidden md:flex'} />
        </div>
    )
}
