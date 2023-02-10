import { FaClock, FaEye, FaHeart } from 'react-icons/fa';
import { BiFoodMenu } from 'react-icons/bi';

import './boxrecipe.css'
import { Button } from '../../../atoms/Button';
import { Link } from 'react-router-dom';

export const BoxRecipe = ({ recipe }) => {
    const {
        id,img, category, name_recipe, author, nmr_hearts, nmr_eyes ,time, ing
    } = recipe;

    return (
        <div className="content-recipe">
            <img src={img} alt={`imagem de ${name_recipe}`} />
            <div className="box-recipe">
                <span>{category}</span>
                <h2>{name_recipe}</h2>
                <h3>por: <span>{author}</span></h3>
                <div className="box-notes">
                    <FaHeart className='heart' /> <span>{nmr_hearts}</span> 
                    <FaEye className='eye' /> <span>{nmr_eyes}</span>
                </div>
            </div>
            <div className="box-hover-recipe">
                <div>
                    <p><FaClock /> {`${time} min`} </p>
                    <p><BiFoodMenu /> {`${ing} ing`} </p>
                </div>
                <Link to={`/recipe/${id}`}>
                <Button customClass={"btn-primary px-8 block mt-4 mx-auto"}>Ver receita</Button>
                </Link>
            </div>
        </div>
    )
}