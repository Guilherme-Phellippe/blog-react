import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"
import { forwardRef } from "react";

export const Categories = forwardRef(({ categories, setMenuIsOpen }, ref) => {
    const IS_MOBILE = window.innerWidth < 764 //check if the user is logged with mobile or desktop

    const handleCloseMenu = () => {
        setMenuIsOpen && setMenuIsOpen(false)
    }

    return (
        <ul
            ref={ref}
            className={`invisible absolute top-[115%] z-50 flex flex-col items-center rounded-lg`}
        >
            {
                categories.map((category, index) => {
                    if (index < 8) {
                        return <Link onClick={handleCloseMenu} className="relative" key={category.id} to={`/category/${category.name_category}`}>
                            <li
                                className={
                                    `border-y-[1px] border-t-transparent hover:border-y-white after:active:w-full after:w-0 after:h-[3px]
                                    after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all 
                                    ${IS_MOBILE && "w-screen text-center p-6 bg-white text-color_orange border-b-color_orange"}
                                    `}
                                key={category.id}
                            >{category.name_category}</li>
                        </Link>
                    } else return null
                })
            }
            {
                categories.length >= 8 &&
                <Link key={0} to={`/category/${categories[0].name_category}`}>  {/* If this list category is greater than eight, this line "Ver todas" is shown */}
                    <li
                        className={`
                            ${IS_MOBILE && "w-screen text-center p-6 bg-white text-color_orange border-b-color_orange"} 
                            underline flex justify-center gap-2 items-center border-y-[1px] 
                            border-t-transparent hover:border-y-white after:active:w-full after:w-0 after:h-[3px]
                            after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all
                        `}
                    >
                        Ver todas <FaArrowRight />
                    </li>
                </Link>
            }
        </ul >
    )
})

// talvz haja mais componentes aqui , por isso está na pasta de molecules