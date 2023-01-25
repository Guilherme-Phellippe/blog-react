import { useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import './menu.css'

export const Menu = () => {

    const [enabledSubCategory, setEnabledSubCategory] = useState(false)

    const handleSubCategory = () => {
        setEnabledSubCategory((disabled)=> !disabled)
    }

    return (
        <div className="container-menu">
            <ul>
                <li className='active'>Home</li>
                <li onClick={handleSubCategory}>Categorias <RiArrowDownSLine />
                    {enabledSubCategory &&
                        <ul>
                            <li>Receitas de bolo</li>
                            <li>Receitas de pão</li>
                            <li>Receitas veganas</li>
                        </ul>
                    }
                </li>
                <li>Dicas de cozinha</li>
                <li>Contato</li>
            </ul>
        </div>
    )
}