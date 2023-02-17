import { useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Categories } from '../../molecules/Categories/Categories'
import './menu.css'

export const Menu = () => {

    const [enabledSubCategory, setEnabledSubCategory] = useState(false)

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

    return (
        <div className="container-menu">
            <ul className='menu'>
                <Link to={'/'}>
                    <li className='active'>Home</li>
                </Link>
                <li onClick={handleSubCategory}>Categorias <RiArrowDownSLine />
                    {enabledSubCategory &&
                        <Categories />
                    }
                </li>
                <Link to={'/store'}>
                    <li>Dicas de cozinha</li>
                </Link>
                <Link to={'/about'}>
                    <li>Sobre nós</li>
                </Link>
            </ul>
        </div>
    )
}