import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCategoryApi } from "../../../hooks/useApi";

export const Categories = ({ customClass }) => {
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
        <ul className="absolute top-[115%] z-50 flex flex-col items-center rounded-lg">
            {
                categories.map((category, index) => {
                    if (index <= 8) {
                        return <Link className="relative" key={category.id} to={`/category/${category.name_category}`}>
                            <li className={`border-y-[1px] border-t-transparent hover:border-y-white after:active:w-full after:w-0 after:h-[3px] after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all ${customClass}`} key={category.id}>{category.name_category}</li>
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