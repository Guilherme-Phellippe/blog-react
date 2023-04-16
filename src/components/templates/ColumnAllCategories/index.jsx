import { useRef } from "react";

export const ColumnAllCategories = ({ categorySelect, setCategorySelect, categories }) => {
    const orderCategories = categories.sort((a, b) => b.recipe - a.recipe);
    const refNav = useRef();

    const handleInfoSelect = (category, { target }) => {
        if (target.textContent === "Meus dados" || target.textContent === "Minhas receitas") refNav.current.scrollTo({ left: (target.offsetLeft - 40), behavior: "smooth" });
        else refNav.current.scrollTo({ left: (target.offsetLeft - target.clientWidth), behavior: "smooth" });
        setCategorySelect(category.name_category)
    }


    return (
        <aside className="w-full md:w-1/5 border-r-2 border-solid" >
            <ul className="w-full flex md:flex-col overflow-auto snap-mandatory snap-x" ref={refNav}>
                {
                    orderCategories.map((category, index) =>
                        index <= 20 &&
                        <li
                            onClick={(e) => handleInfoSelect(category, e)}
                            key={category.id}
                            className={`w-44 md:w-full flex-none snap-center cursor-pointer text-s1_3 text-center py-4 border-b-[1px] border-solid transition-colors duration-300 hover:bg-color_orange hover:text-white ${categorySelect === category.name_category && 'bg-color_orange text-white'}`}
                        >{category.name_category}</li>
                    )
                }
            </ul>
        </aside>
    )
}