import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"

export const CarouselMidiasContent = ({ img, name_recipe, category }) => {
    const { valueSearch } = useContext(HomeContext)


    return (
        <>
            <div id="title-recipe" className={`flex gap-2 justify-between items-center px-2 h-[5%] ${valueSearch ? 'hidden':''}`}>
                
                {category && <>
                    <h2 className="text-s1_4 leading-6">{name_recipe}</h2>
                    <h3 className="text-s1_2 w-1/4"> - {category}</h3>
                </>}
            </div>
            <div className={`${valueSearch ? "order-1 w-1/2 h-full":'w-full h-[65%]'} max-h-[600px] mt-4 overflow-hidden`}>
                <img className={`w-full h-full object-cover`} src={img[0].big} alt={name_recipe} />
            </div>
        </>
    )
}