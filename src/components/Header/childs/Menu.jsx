import { FaSearch } from 'react-icons/fa'
import './menu.css'

export const Menu  = () => { 
    return(
        <div className="container-menu">
            <ul>
            <li className='active'>Home</li>
            <li>Categorias</li>
            <li>Dicas de cozinha</li>
            <li>Contato</li>
            </ul>
            <div className="content-search">
                <div className="search">
                    <input type="text" placeholder='Busque uma receita aqui...'/>
                    <FaSearch />
                </div>
            </div>
        </div>
    )
}