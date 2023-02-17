import moment from "moment"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Button } from "../../atoms/Button"

export const AddRecipeInfo = ({ content: {author, id, name_recipe, createdAt}}) => {
    const { valueSearch } = useContext(HomeContext)


    return (
        <div className={`h-[10%] flex flex-col items-center justify-center ${valueSearch && 'order-3 w-1/2'}`}>
            <div className={valueSearch ? 'flex flex-col items-center justify-center' : 'hidden'}>
                <h2 className="text-s1_5">{name_recipe}</h2>
                <h2 className="text-s1_2 mt-4">Criado por: <span className="text-color_primary">{author}</span></h2>
                <p className="text-s1 mt-4 font-bold">criado em: <span className="text-gray-500 font-normal">{moment(createdAt).format('lll')}</span></p>
            </div>
            <Link to={'/recipe/' + id} >
                <Button customClass={'btn-primary px-8 mt-4'}>Ver receita</Button>
            </Link>
            <Link className="m-2 underline cursor-pointer" to={`/poll?name=${name_recipe}`}>Vote como receita do mês</Link>
        </div>
    )
}