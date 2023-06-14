import { useContext, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Input } from "../../atoms/Input";

export const Search = ({ width = 'w-1/2' }) => {
    const { setValueSearch } = useContext(HomeContext);
    const { pathname } = useLocation()
    const [qs] = useSearchParams()
    const navigate = useNavigate();
    const refInputSearch = useRef();

    /**
    *  Tudo oque usuario digita no input search é adicionado no setValueSearch
    * @param {*} param0 
    */
    const handleSetValue_Navigate = ({ target }) => {
        if (target.value.length === 1 && pathname !== '/') {
            navigate(`/?search=${target.value}`)
        }
        setValueSearch(target.value);
        handleShowRecipeWithScroll();
    }

    /**
     * Essa função é uma massete, quando a página carrega ela não exibe a receita até que o usuario
     * de scroll, então caso o usuario busque uma receita ela não será exibida por que não há scroll,
     * essa função corrige isso dando um scroll fantasma assim que o usuario começa a digita a receita,
     * ela também da apenas um scroll usando o parametro na url de screen, caso o screen esteja com o valor
     * "Show", é por que conteudo das receitas já está visivel e não há necessidade de dar scroll novamente.
     */
    const handleShowRecipeWithScroll = () => {
        if(qs.get('screen') !== "show"){
            window.scroll({
                top: 22,
                left: 0,
                behavior: "smooth",
            })
    
            setTimeout(() => {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                })
            }, 80)

            qs.set('screen', "show")
        }
    }

    /**
    * Caso tenha algum parametro na url, a função adicionar ela no valueSearch global
    * @param {*} param0 
    */
    useEffect(() => {
        refInputSearch.current.value = qs.get('search')
        setValueSearch(qs.get('search'))
    }, [qs, setValueSearch])

    return (
        <div className={`h-full flex justify-center  items-center ${width}`}>
            <Input
                ref={refInputSearch}
                placeholder="Busque uma receita aqui..."
                onChange={handleSetValue_Navigate}
                icon={<FaSearch className="text-s2_5 p-2 flex items-center cursor-pointer bg-color_orange text-white rounded-full" />}
                customWidthAndMargin="w-[95%] md:w-[70%]"
            />
        </div>
    )
}
