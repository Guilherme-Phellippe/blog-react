import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"

export const CarouselMidiasContent = ({ img, name_recipe, category }) => {
    const { valueSearch } = useContext(HomeContext)


    return (
        <>
            <div id="title-recipe" className={`flex gap-2 items-center px-4 h-[5%] ${valueSearch ? 'hidden':''}`}>
                
                {category && <>
                    <h2 className="text-s1_3">{name_recipe}</h2>
                    <h3 className="text-s1_2"> - {category}</h3>
                </>}
            </div>
            <div className={`${valueSearch ? "order-1 w-1/2 h-full":'w-full h-[65%]'} overflow-hidden`}>
                <img className={`w-full h-full object-cover`} src={img} alt={name_recipe} />
            </div>
        </>
    )
}
//será adicionado mais elementos por isso esse elemento está em molecules