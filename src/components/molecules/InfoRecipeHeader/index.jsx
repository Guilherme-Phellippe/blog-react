import { NumberLoved } from '../../atoms/NumberLoved'

export const InfoRecipeHeader = ({ nmr_hearts, name_recipe }) => {
    return (
        <div className='flex justify-between'>
            <h1 className='w-1/2 text-s1_5 text-color_primary font-bold'>{name_recipe.toUpperCase()}</h1>
            <NumberLoved nmr_hearts={nmr_hearts}/>
        </div>
    )
}