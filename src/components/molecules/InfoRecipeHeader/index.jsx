import { NumberLoved } from '../../atoms/NumberLoved'

export const InfoRecipeHeader = ({ nmr_hearts, name_recipe }) => {

    return (
        <div id="InfoRecipeHeader-print" className='flex justify-between items-center py-4'>
            <h1 className='w-1/2 text-s1_5 text-color_orange font-bold'>{name_recipe.toUpperCase()}</h1>
            <NumberLoved nmr_hearts={nmr_hearts.length}/>
        </div>
    )
}