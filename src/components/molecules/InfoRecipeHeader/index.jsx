import { FaArrowLeft } from 'react-icons/fa'
import { Button } from '../../atoms/Button'
import { NumberLoved } from '../../atoms/NumberLoved'
import { useNavigate } from 'react-router-dom'

export const InfoRecipeHeader = ({ nmr_hearts, name_recipe }) => {
    const navigate = useNavigate()

    return (
        <div id="InfoRecipeHeader-print" className='flex flex-col items-start gap-4'>
            <div className="flex">
                <Button 
                event={()=> navigate('/')}
                    className="flex items-center gap-2 text-s1 text-color_text_black"
                ><FaArrowLeft /> Voltar a home</Button>
            </div>
            <div className="flex w-full justify-between px-4">
                <h1 className='w-2/3 text-s1_5 text-color_orange font-bold'>{name_recipe.toUpperCase()}</h1>
                <NumberLoved nmr_hearts={nmr_hearts.length} />
            </div>
        </div>
    )
}