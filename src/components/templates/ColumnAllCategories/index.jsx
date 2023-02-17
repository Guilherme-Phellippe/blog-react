import { useEffect } from "react"
import categories from "../../../scripts/api/categories"

export const ColumnAllCategories = ({ categorySelect, setCategorySelect}) => {
    
    
    useEffect(() =>{
        categories.sort((a,b) => a.name_category.toLowerCase() < b.name_category.toLowerCase()  ? -1 : a.name_category.toLowerCase() > b.name_category.toLowerCase() ? 1 : 0)
    },[])


    return (
        <aside className="w-1/5 border-r-2 border-solid" >
            <ul className="w-full">
                {
                    categories.map(category => 
                    <li 
                        onClick={() => setCategorySelect(category.name_category)}
                        key={category.id}
                        className={`${categorySelect === category.name_category && 'bg-color_second text-white'} w-full cursor-pointer text-s1_3 text-center py-4 border-b-[1px] border-solid transition-colors hover:bg-color_second hover:text-white`}
                    >{category.name_category}</li>)
                }
            </ul>
        </aside>
    )
}