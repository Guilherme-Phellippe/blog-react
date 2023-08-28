import { FaArrowLeft } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import { NumberLoved } from '../../atoms/NumberLoved'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';

import { HomeContext } from "../../../contexts/Home/HomeProvider"

export default function InfoRecipeHeader({ nmr_hearts, name_recipe, category }) {
    const { valueSearch } = useContext(HomeContext);
    const navigate = useNavigate()

    return (
        <>
            {
                category &&
                <div id="title-recipe" className={`flex flex-col gap-2 items-center px-2 h-[5%] ${valueSearch ? 'hidden' : ''}`}>
                    <h3 className="text-s1_2 text-color_orange">{category}</h3>
                    <h2 className="text-s1_4 leading-6">{name_recipe}</h2>
                </div>
            }

            <div id="InfoRecipeHeader-print" className='flex flex-col items-start gap-4'>
                <div className="flex">
                    <Button
                        event={() => navigate('/')}
                        className="flex items-center gap-2 text-s1 text-color_text_black"
                    ><FaArrowLeft /> Voltar a home</Button>
                </div>
                <div className="flex w-full justify-between px-4">
                    <h1 className='w-2/3 text-s1_5 text-color_orange font-bold'>{name_recipe.toUpperCase()}</h1>
                    <NumberLoved nmr_hearts={nmr_hearts.length} />
                </div>
            </div>

        </>
    )
}