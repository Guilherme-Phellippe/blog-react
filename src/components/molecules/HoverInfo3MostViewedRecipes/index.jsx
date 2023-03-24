import { FaClock } from "react-icons/fa"
import { BiFoodMenu } from "react-icons/bi"

import { Button } from '../../atoms/Button'

export const HoverInfo3MostViewedRecipes = ({ recipe: { time, ing, id } }) => {
    return (
        <div className="hidden z-[1] bg-[#fffa] p-4 w-1/2 min-w-[150px] rounded-2xl flex-col group-hover:flex">
            <div className="flex w-full justify-center cursor-default">
                <p className="text-s1_5 text-color_text mx-2 flex flex-col justify-center items-center cursor-default">
                    <FaClock className="text-s1_7 text-color_primary" /> {`${time} min`}
                </p>
                <p className="text-s1_5 text-color_text mx-2 flex flex-col justify-center items-center cursor-default">
                    <BiFoodMenu className="text-s1_7 text-color_primary" /> {`${ing.length} ing`}
                </p>
            </div>
            <Button customClass={"btn-primary px-8 block mt-4 mx-auto"}>Ver receita</Button>
        </div>
    )
}
