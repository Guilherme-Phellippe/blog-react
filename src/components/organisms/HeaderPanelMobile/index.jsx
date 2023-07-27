import { useRef } from "react";
import { Logo } from "../../atoms/HeaderLogo"; import { formatTextLong } from '../../../scripts/formatTextLong'
import { Img } from '../../atoms/Img'
import { MdArrowDropDown } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { dialog } from '../../../modals/Dialog'
import { FaAddressCard, FaSignOutAlt } from "react-icons/fa";

export default function HeaderPanelMobile({ user }) {
    const refSubMenu = useRef(null)
    const navigate = useNavigate();



    const handleDisplaySubMenu = () => {
        user ?
            refSubMenu.current.classList.toggle("invisible")
            :
            navigate("/login")
    }

    const handleOutAccount = async () => {
        const canExit = await dialog("Deseja realmente sair da sua conta?", 0, "Desejo sair")

        if (canExit) {
            localStorage.removeItem("token");
            window.location.reload();
        }
    }

    return (
        <div className="h-full px-4 flex md:hidden justify-between items-center">
            <div className="w-1/4 h-full flex md:hidden">
                <Logo />
            </div>
            <div
                className="w-2/4 flex flex-col justify-end items-center relative text-white"
                onClick={handleDisplaySubMenu}
            >
                <div className="flex">
                    <div className="h-[35px] w-[35px] rounded-full overflow-hidden mr-4">
                        <Img
                            imgs={user?.photo || "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                            title={user?.name || "foto do usuario sem avatar"}
                        />
                    </div>
                    <p className='text-s1_2 flex justify-end flex-col text-white'>
                        Bem vindo,
                        <span className={`${window.innerWidth < 392 ? "text-s1_3" : "text-s1_5"} text-white font-bold`}>
                            {formatTextLong(user?.name || "Usuário", 18)}
                        </span>
                    </p>
                    <MdArrowDropDown
                        className='text-s2_5 self-end'
                    />
                </div>

                <div
                    ref={refSubMenu}
                    className="invisible flex flex-col w-full bg-white absolute top-full translate-y-6 shadow-lg rounded-lg"
                >
                    <ul>
                        <Link to={'/panel-user'}>
                            <li className='py-4 flex justify-center items-center gap-4 text-s1_5 text-center text-color_text_black_light'>
                                <FaAddressCard />Acessar painel
                            </li>
                        </Link>
                        <li
                            className='py-4 flex justify-center items-center gap-4 text-s1_5 text-center text-color_text_black_light'
                            onClick={handleOutAccount}
                        ><FaSignOutAlt /> Sair da conta</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}