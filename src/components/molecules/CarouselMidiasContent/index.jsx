import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { defineSizeImage } from "../../../scripts/defineSizeImage";
import { Img } from "../../atoms/Img";

export const CarouselMidiasContent = ({ img, name_recipe, category }) => {
    const { valueSearch } = useContext(HomeContext);
    
    return (
        <>
            <div id="title-recipe" className={`flex flex-col gap-2 items-center px-2 h-[5%] ${valueSearch ? 'hidden':''}`}>
                {category && <>
                    <h3 className="text-s1_2 text-color_orange">{category}</h3>
                    <h2 className="text-s1_4 leading-6">{name_recipe}</h2>
                </>}
            </div>
            <div className={`${valueSearch ? "order-1 w-1/2 h-full":'w-full h-[65%]'} max-h-[600px] mt-4 overflow-hidden`}>
                <Img src={defineSizeImage(img)} alt={name_recipe} />
            </div>
        </>
    )
}