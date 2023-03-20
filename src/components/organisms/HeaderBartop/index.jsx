import { Logo } from '../../atoms/HeaderLogo';
import { Search } from "../../molecules/HeaderSearch/Search"
import { SocialMidia } from "../../atoms/HeaderSocialMidia"

export const Bartop = () => {
    return (
        <div className="order-2 md:order-1 bg-color_primary h-[60px] flex justify-between items-center border-b-[1px] border-b-[#24242420]">
            <Logo hidden={'hidden md:flex justify-center'}/>
            <Search width={'w-full'}/>
            <SocialMidia hidden={'hidden md:flex'}/>
        </div>
    )
}
