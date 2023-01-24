import { RiArrowDownSLine } from 'react-icons/ri'
import './menu.css'

export const Menu = () => {
    return (
        <div className="container-menu">
            <ul>
                <li className='active'>Home</li>
                <li>Categorias <RiArrowDownSLine /></li>
                <li>Dicas de cozinha</li>
                <li>Contato</li>
            </ul>
        </div>
    )
}