import { FaEye, FaHeart } from "react-icons/fa"

export const Info3MostViewedRecipes = ({recipe : { name_recipe, category, author, nmr_hearts, nmr_eyes}}) => { 
    return(
        <div className="box-recipe">
                <span>Sem categoria</span>
                <h2>{name_recipe}</h2>
                <h3>por: <span className='font-bold'>{author}</span></h3>
                <div className="box-notes">
                    <FaHeart className='heart' /> <span>{nmr_hearts}</span> 
                    <FaEye className='eye' /> <span>{nmr_eyes}</span>
                </div>
            </div>
    )
}