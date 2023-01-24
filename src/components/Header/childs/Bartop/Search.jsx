import { FaSearch } from "react-icons/fa"

import './search.css'

export const Search = () => {
    return (
        <div className="content-search">
            <div className="search">
                <input type="text" placeholder='Busque uma receita aqui...' />
                <FaSearch />
            </div>
        </div>
    )
}