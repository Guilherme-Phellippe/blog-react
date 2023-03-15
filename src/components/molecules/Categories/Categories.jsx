import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryApi } from "../../../hooks/useApi";

export const Categories = () => {
    const refCategoryApi = useRef(useCategoryApi())
    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await refCategoryApi.current.getAllCategory();
            data.sort((a, b) => b.recipe - a.recipe)
            const categories = data.filter(category => category.recipe >= 1)
            setCategories(categories)
        })()
    }, [])


    return (
        <ul>
            {
                categories.map((category, index) => {
                    if (index <= 8) {
                        return <Link key={category.id} to={`/category/${category.name_category}`}>
                            <li key={category.id}>{category.name_category}</li>
                        </Link>
                    } else return null
                })
            }
            {categories.length >= 8 &&
                <Link key={0} to={`/category/${categories[0].name_category}`}>
                    <li key={0}>Ver todas</li>
                </Link>
            }
        </ul >
    )
}

// talvz haja mais componentes aqui , por isso está na pasta de molecules