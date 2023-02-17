import { Link } from "react-router-dom";
import categories from "../../../scripts/api/categories";

export const Categories = () => {
    return (
        <ul>
            {
                categories.map(category =>
                    <Link to={`/category/${category.name_category}`}>
                        <li key={category.id}>{category.name_category}</li>
                    </Link>
                )
            }
        </ul >
    )
}

// talvz haja mais componentes aqui , por isso está na pasta de molecules