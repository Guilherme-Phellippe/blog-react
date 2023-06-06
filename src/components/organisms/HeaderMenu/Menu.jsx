import { useEffect, useRef, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Categories } from '../../molecules/Categories/Categories'

import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'

import { SocialMidia } from '../../atoms/HeaderSocialMidia'
import { LinkNavigation } from '../../atoms/LinkNavigation'
import { Logo } from '../../atoms/HeaderLogo'
import { PanelUser } from '../PanelUser/PanelUser'
import { useCategoryApi } from '../../../hooks/useApi'

export const Menu = () => {
    const refCategoryApi = useRef(useCategoryApi())
    const [categories, setCategories] = useState([])
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [enabledSubCategory, setEnabledSubCategory] = useState(false)

    useEffect(() => {
        handleActiveLineTextMenu();
        (async () => {
            const { data } = await refCategoryApi.current.getAllCategory();
            data.sort((a, b) => b.recipe - a.recipe)
            const categories = data.filter(category => category.recipe >= 1)
            setCategories(categories)
        })()
    }, [])

    useEffect(() => {
        const takeClick = (e) => {
            if(!e.target.matches('li') && !e.target.matches('svg')) setEnabledSubCategory(false)
        }
        document.addEventListener('click', takeClick)
        return () => document.removeEventListener('click', takeClick)
    }, [enabledSubCategory])


    const handleSubCategory = () => {
        setEnabledSubCategory((disabled) => !disabled)
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
            <>
                {
                    !menuIsOpen ?
                        <>
                            <ul className='menu hidden md:flex w-full h-full justify-center items-center list-none' >

                                <LinkNavigation route={'/'} customClass={''}>Home</LinkNavigation>

                                <li
                                    className='text-white bg-color_orange p-4 text-s1_5 relative cursor-pointer flex justify-center items-center after:hover:w-full after:active:w-full after:w-0 after:h-[3px] after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all'
                                    onClick={handleSubCategory}
                                >
                                    Categorias <RiArrowDownSLine />
                                    {enabledSubCategory &&
                                        <Categories
                                            categories={categories}
                                            customClass={"w-[150px] text-center p-2 text-white bg-color_orange border-b-[#fff5]"}
                                        />
                                    }
                                </li>

                                <LinkNavigation route={'/about'} customClass={''}>Sobre nós</LinkNavigation>
                                <LinkNavigation route={'/contact'} customClass={''}>Contato</LinkNavigation>
                            </ul>


                            <div className="h-full px-4 flex md:hidden justify-between items-center">
                                <div className="w-1/4 h-full flex md:hidden">
                                    <Logo />
                                </div>
                                <div className="w-1/4 flex justify-end relative">
                                    <GiHamburgerMenu onClick={() => setMenuIsOpen(true)} className='fill-white text-s2_5 cursor-pointer' />
                                </div>
                            </div>
                        </>
                        :
                        <div className="fixed top-0 left-0  w-screen h-screen z-[99] flex flex-col bg-white">
                            <div className="w-full flex justify-center items-center">
                                <PanelUser isMobile={true} />
                                <MdClose onClick={() => setMenuIsOpen(false)} className='absolute right-8 text-s2_5 fill-color_orange font-bold' />
                            </div>

                            <ul className='menu flex flex-col w-full  items-center list-none' >
                                <LinkNavigation
                                    onClick={() => setMenuIsOpen(false)}
                                    route={'/'}
                                    customClass={'border-b-[#fff4] border-b-[1px] w-screen'}
                                >Home</LinkNavigation>

                                <li
                                    className='w-full text-white bg-color_orange p-4 text-s1_5 relative cursor-pointer flex justify-center items-center border-b-[#fff4] border-b-[1px] transition-all'
                                    onClick={handleSubCategory}
                                >Categorias <RiArrowDownSLine />
                                    {enabledSubCategory &&
                                        <Categories
                                            setMenuIsOpen={setMenuIsOpen}
                                            categories={categories}
                                            customClass={"w-screen text-center p-6 bg-white text-color_orange border-b-color_orange"}
                                        />
                                    }
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
                }
            </>
        </div>
    )
}
