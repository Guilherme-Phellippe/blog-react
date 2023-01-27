import { FaSearch } from "react-icons/fa"

import './search.css'

export const Search = ({ setValueSearch }) => {
    return (
        <div className="content-search">
            <div className="search">
                <input 
                    type="text" 
                    placeholder='Busque uma receita aqui...' 
                    onChange={(e) => setValueSearch(e.target.value)}
                />
                <FaSearch />
            </div>
        </div>
    )
}