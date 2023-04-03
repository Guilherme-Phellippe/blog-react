import { FaEye, FaHeart } from "react-icons/fa"
import { formatTextLong } from "../../../scripts/formatTextLong";

export const Info3MostViewedRecipes = ({recipe : { name_recipe, category, user, nmr_hearts, nmr_eyes}, index}) => {
    const SCREEN_SIZE = window.innerWidth;

    return(
        <div className="w-4/5 z-[1] flex flex-col justify-center items-center group-hover:hidden">
                <span className="text-s1_2 hidden md:block">{category.name_category}</span>
                <h2 className={`text-center z-[1] mb-2 font-semibold ${index === 0 ? "text-s2": "text-s1_5"}`}>{SCREEN_SIZE < 550 ? formatTextLong(name_recipe, 20) : name_recipe}</h2>
                <h3 className={`text-color_text ${index === 0 ? "text-s1_5": "text-s1_2"}`}>por: <span className='text-color_primary font-bold bg-[#fffa] rounded-lg p-1'>{user.name}</span></h3>
                <div className={`flex justify-center items-center m-4 z-[1] bg-[#fffa] rounded-lg ${index === 0 ? "px-2 py-4":"p-2" }`}>
                    <FaHeart className='text-s1_5 text-[#ff3e3e;]' /> 
                    <span className="text-s1_5 mx-1">{nmr_hearts.length}</span> 
                    <FaEye className='text-s1_5 text-[#0051ff] ml-4' />
                    <span className="text-s1_5 mx-1">{nmr_eyes}</span>
                </div>
            </div>
    )
}


