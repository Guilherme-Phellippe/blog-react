import { Link } from "react-router-dom"

export const LinkNavigation = ({ route , customClass, onClick , children}) => {
    return (
        <Link onClick={onClick} to={route}>
            <li className={`${customClass} text-white bg-color_orange p-4 text-s1_5 relative cursor-pointer flex justify-center items-center after:hover:w-full after:active:w-full after:w-0 after:h-[3px] after:bg-white after:absolute after:-bottom-2 after:left-0 transition-all`}>
                {children}
            </li>
        </Link>
    )
}