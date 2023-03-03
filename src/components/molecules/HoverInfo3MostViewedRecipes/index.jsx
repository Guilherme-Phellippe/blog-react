import { FaClock } from "react-icons/fa"
import { BiFoodMenu } from "react-icons/bi"
import { Link } from "react-router-dom"

import { Button } from '../../atoms/Button'

export const HoverInfo3MostViewedRecipes = ({recipe: { time, ing, id}}) => { 
    return(
        <div className="box-hover-recipe">
                <div>
                    <p><FaClock /> {`${time} min`} </p>
                    <p><BiFoodMenu /> {`${ing.length} ing`} </p>
                </div>
                <Link to={`/recipe/${id}`}>
                    <Button customClass={"btn-primary px-8 block mt-4 mx-auto"}>Ver receita</Button>
                </Link>
            </div>
    )
}