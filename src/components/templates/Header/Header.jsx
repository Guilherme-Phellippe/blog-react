import { Bartop } from '../../organisms/HeaderBartop'
import { Menu } from '../../organisms/HeaderMenu/Menu'

export const Header = () => {
    return (
        <>
            <header className='w-full bg-color_orange flex flex-col items-center z-[999] mb-8 md:mb-16'>
                <Bartop />
                <Menu />
            </header>
            <ins class="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-format="fluid"
                data-ad-layout-key="-6o+ed+2i-1n-4w"
                data-ad-client="ca-pub-4781060024956035"
                data-ad-slot="1096599178"
            ></ins>
        </>
    )
}
