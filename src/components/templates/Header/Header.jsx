import { Bartop } from '../../organisms/HeaderBartop'
import { Menu } from '../../organisms/HeaderMenu/Menu'

export const Header = () => {
    return (
        <header className='w-full bg-color_orange flex flex-col items-center z-[999] mb-8 md:mb-16'>
            <Bartop />
            <Menu />
        </header>
    )
}
