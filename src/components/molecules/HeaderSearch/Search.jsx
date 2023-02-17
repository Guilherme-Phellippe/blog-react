import { useContext, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Input } from "../../atoms/Input";

export const Search = () => {
    const { setValueSearch } = useContext(HomeContext);
    const { pathname } = useLocation()
    const [qs] = useSearchParams()
    const navigate = useNavigate();
    const refInputSearch = useRef();

    const handleSetValue_Navigate = ({ target }) => {
        if (target.value.length === 1 && pathname !== '/') {
            navigate(`/?search=${target.value}`)
        }
        setValueSearch(target.value)
    }
    useEffect(()=>{
        refInputSearch.current.focus()
        refInputSearch.current.value = qs.get('search')
        setValueSearch(qs.get('search'))
    }, [qs, setValueSearch])

    return (
        <div className="w-1/2 h-full grid place-items-center">
            <Input
                ref={refInputSearch}
                placeholder="Busque uma receita aqui..."
                onChange={handleSetValue_Navigate}
                icon={<FaSearch className="text-s2_5 p-2 flex items-center cursor-pointer bg-color_primary text-white rounded-full" />}
                size={2}
            />
        </div>
    )
}
