import { useContext } from "react"
import { FaSearch } from "react-icons/fa"
import { HomeContext } from "../../../contexts/Home/HomeProvider"

import './search.css'

export const Search = () => {
    const { setValueSearch } = useContext(HomeContext);

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