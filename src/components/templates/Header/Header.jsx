import { Bartop } from '../../organisms/HeaderBartop'
import { Menu } from '../../organisms/HeaderMenu/Menu'

export const Header = () => {
    return (
        <header className='w-full bg-white flex flex-col'>
            <Bartop />
            <Menu />
        </header>
    )
}
