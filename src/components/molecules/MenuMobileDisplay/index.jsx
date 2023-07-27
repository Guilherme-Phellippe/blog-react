import { MdClose } from "react-icons/md";
import { PanelUser } from "../../organisms/PanelUser/PanelUser";
import { LinkNavigation } from "../../atoms/LinkNavigation";
import { RiArrowDownSLine } from "react-icons/ri";
import { Categories } from "../Categories/Categories";
import { useRef } from "react";
import { SocialMidia } from "../../atoms/HeaderSocialMidia";

export default function MenuMobileDisplay({ setMenuIsOpen, setValueSearch, categories }) {
    const refCategories = useRef(null)


    const handleSubCategory = () => {
        refCategories.current.classList.toggle("invisible")
    }

    return (
        <div className="flex md:hidden fixed top-0 left-0 w-screen h-screen z-[998] flex-col bg-white">
            <div className="w-full flex justify-center items-center">
                <PanelUser isMobile={true} />
                <MdClose onClick={() => setMenuIsOpen(false)} className='absolute right-8 text-s2_5 fill-color_orange font-bold' />
            </div>

            <ul className='menu flex flex-col w-full  items-center list-none' >
                <LinkNavigation
                    onClick={() => { setMenuIsOpen(false); setValueSearch('') }}
                    route={'/'}
                    customClass={'border-b-[#fff4] border-b-[1px] w-screen'}
                >Home</LinkNavigation>

                <li
                    className='w-full text-white bg-color_orange p-4 text-s1_5 relative cursor-pointer flex justify-center items-center border-b-[#fff4] border-b-[1px] transition-all'
                    onClick={handleSubCategory}
                >Categorias <RiArrowDownSLine />
                    <Categories
                        ref={refCategories}
                        setMenuIsOpen={setMenuIsOpen}
                        categories={categories}
                    />
                </li>

                <LinkNavigation
                    onClick={() => setMenuIsOpen(false)}
                    route={'/about'}
                    customClass={'border-b-[#fff4] border-b-[1px] w-screen'}
                >Sobre nós</LinkNavigation>
                <LinkNavigation
                    onClick={() => setMenuIsOpen(false)}
                    route={'/contact'}
                    customClass={'border-b-[#fff4] border-b-[1px] w-screen'}
                >Contato</LinkNavigation>
            </ul>

            <div className="flex w-full h-[10%] justify-center items-center px-8">
                <SocialMidia isMobile={true} />
            </div>
        </div>
    )
}