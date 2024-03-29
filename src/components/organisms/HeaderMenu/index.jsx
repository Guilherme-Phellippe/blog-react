import { useContext, useEffect, useRef } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Categories } from '../../molecules/Categories/Categories'

import { LinkNavigation } from '../../atoms/LinkNavigation'

import HeaderMenuMobile from '../HeaderPanelMobile'
import { HomeContext } from '../../../contexts/Home/HomeProvider'

export default function Menu({ categories, user }) {

    const { setValueSearch } = useContext(HomeContext)
    const refCategories = useRef(null)

    useEffect(() => {
        handleActiveLineTextMenu();

        const takeClick = (e) => {
            if (!e.target.matches('li') && !e.target.matches('svg')) {
                refCategories.current?.classList.add("invisible")
            }
        }

        document.addEventListener('click', takeClick)

        return () => document.removeEventListener('click', takeClick)
    }, [])


    const handleSubCategory = () => {
        refCategories.current.classList.toggle("invisible")
    }

    const handleActiveLineTextMenu = () => {
        const menu = document.querySelectorAll('.container-menu .menu li')
        menu.forEach(m => {
            m.addEventListener('click', () => {
                menu.forEach(m => m.classList.remove('active'))
                m.classList.add('active')
            })
        })
    }



    return (
        <div className="container-menu w-full h-[50px] items-center bg-color_orange order-1 md:order-2">
            <ul className='menu hidden md:flex w-full h-full justify-center items-center list-none' >

                <LinkNavigation
                    onClick={() => setValueSearch(undefined)}
                    route={'/'}
                    customClass={''}
                >Home</LinkNavigation>

                <li
                    className='text-white bg-color_orange p-4 text-s1_5 relative cursor-pointer flex justify-center items-center after:hover:w-full after:active:w-full after:w-0 after:h-[3px] after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all'
                    onClick={handleSubCategory}
                >
                    Categorias <RiArrowDownSLine />
                    <Categories
                        ref={refCategories}
                        categories={categories}
                        customLiClass={"w-[150px] text-center p-2 text-white bg-color_orange border-b-[#fff5]"}
                    />
                </li>

                <LinkNavigation route={'/about'} customClass={''}>Sobre nós</LinkNavigation>
                <LinkNavigation route={'/contact'} customClass={''}>Contato</LinkNavigation>
            </ul>

            {/* this menu will only be displayed when user is in resolution lower than 700px */}
            <HeaderMenuMobile user={user} />
        </div >
    )
}
