import moment from "moment"
import { useContext } from "react"
import { FaListAlt, FaPoll } from "react-icons/fa"
import { Link } from "react-router-dom"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Button } from "../../atoms/Button"

export const AddRecipeInfo = ({ content: { author, id, name_recipe, createdAt } }) => {
    const { valueSearch } = useContext(HomeContext)


    return (
        <div className={`h-[10%] flex flex-col items-center justify-center ${valueSearch && 'order-3 w-1/2'}`}>
            <div className={valueSearch ? 'flex flex-col items-center justify-center' : 'hidden'}>
                <h2 className="text-s1_5">{name_recipe}</h2>
                <h2 className="text-s1_2 mt-4">Criado por: <span className="text-color_primary">{author}</span></h2>
                <p className="text-s1 mt-4 font-bold">criado em: <span className="text-gray-500 font-normal">{moment(createdAt).format('lll')}</span></p>
            </div>
            <div className={`w-full h-full flex justify-evenly items-center ${valueSearch ? "mt-8":"border-b-[1px] "}`}>
                <Link to={'/recipe/' + id} >
                    <Button customClass={'btn-primary px-8 text-s1_3'}><FaListAlt /> Ver receita</Button>
                </Link>
                <Link className={`${valueSearch && 'hidden'}`} to={`/poll?name=${name_recipe}`}>
                    <Button customClass={'btn-primary px-8 text-s1_3'}><FaPoll /> Votar</Button>
                </Link>
            </div>
        </div>
    )
}