import { useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Categories } from '../../molecules/Categories/Categories'

import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'

import './menu.css'
import { SocialMidia } from '../../atoms/HeaderSocialMidia'
import { LinkNavigation } from '../../atoms/LinkNavigation'
import { Logo } from '../../atoms/HeaderLogo'
import { PanelUser } from '../PanelUser/PanelUser'

export const Menu = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [enabledSubCategory, setEnabledSubCategory] = useState(false)

    useEffect(() => {
        handleActiveLineTextMenu();
    }, []);

    useEffect(() => {
        const takeClick = (e) => {
            !e.target.matches('li') && setEnabledSubCategory(false)
        }
        document.addEventListener('click', takeClick)
        return () => document.removeEventListener('click', takeClick)
    }, [enabledSubCategory])


    const handleSubCategory = (event) => {
        const [hasListMenu] = event.target.classList
        if (hasListMenu) setEnabledSubCategory((disabled) => !disabled)
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
        <div className="container-menu w-full h-[50px] items-center bg-color_primary order-1 md:order-2">
            <>
                {
                    !menuIsOpen ?
                        <>
                            <ul className='menu hidden md:flex w-full h-full justify-center items-center list-none' >

                                <LinkNavigation route={'/'} customClass={''}>Home</LinkNavigation>

                                <LinkNavigation
                                    route={''}
                                    customClass={''}
                                    onClick={handleSubCategory}
                                >Categorias <RiArrowDownSLine />
                                    {enabledSubCategory &&
                                        <Categories customClass={"w-[150px] text-center p-2 text-white bg-color_primary border-b-[#fff5]"} />
                                    }
                                </LinkNavigation>

                                <LinkNavigation route={'/store'} customClass={''}>Loja</LinkNavigation>

                                <LinkNavigation route={'/about'} customClass={''}>Sobre</LinkNavigation>

                            </ul>


                            <div className="h-full p-4 flex md:hidden justify-between items-center">
                                <Logo hidden={"flex md:hidden"} />
                                <GiHamburgerMenu onClick={() => setMenuIsOpen(true)} className='fill-white text-s2_5 cursor-pointer' />
                            </div>
                        </>
                        :
                        <div className="fixed top-0 left-0  w-screen h-screen z-[99] flex flex-col bg-white">
                            <div className="w-[90%] flex justify-between items-center">
                                <PanelUser />
                                <MdClose onClick={() => setMenuIsOpen(false)} className='text-s2_5 fill-color_primary font-bold' />
                            </div>

                            <ul className='menu flex flex-col w-full  items-center list-none' >
                                <LinkNavigation route={'/'} customClass={'border-b-[#fff4] border-b-[1px] w-screen'}>Home</LinkNavigation>

                                <LinkNavigation
                                    route={''}
                                    customClass={'border-b-[#fff4] border-b-[1px] w-screen'}
                                    onClick={handleSubCategory}
                                >Categorias <RiArrowDownSLine />
                                    {enabledSubCategory &&
                                        <Categories customClass={"w-screen text-center p-6 bg-white text-color_primary border-b-color_primary"} />
                                    }
                                </LinkNavigation>

                                <LinkNavigation route={'/store'} customClass={'border-b-[#fff4] border-b-[1px] w-screen'}>Loja</LinkNavigation>

                                <LinkNavigation route={'/about'} customClass={'border-b-[#fff4] border-b-[1px] w-screen'}>Sobre</LinkNavigation>

                            </ul>
                            <div className="flex w-full h-[10%] justify-center items-center px-8">
                                <SocialMidia />
                            </div>
                        </div>
                }
            </>
        </div>
    )
}
