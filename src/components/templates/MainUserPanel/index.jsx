import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { GiHamburgerMenu } from 'react-icons/gi'

import { Loading } from "../../../components/atoms/Loading/Loading"
import { ActiveInformation } from "../../organisms/ActiveInformation"
import { useUserApi } from "../../../hooks/useApi"

export const MainUserPanel = () => {
    const navLinks = ["Meus dados", "Minhas receitas", "Receitas salvas", "Notificações"];
    const [user, setUser] = useState();
    const [openMenuHambuguer, setOpenMenuHambuguer] = useState(true)
    const navigate = useNavigate()
    const [infoSelect, setInfoSelect] = useState(navLinks[0]);
    const refUserApi = useRef(useUserApi())
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
            (async () => {
                const user = await refUserApi.current.authenticateLogin()
                setUser(user.data)
            })()
        } else navigate('/')
    }, [token, navigate]);

    const handleInfoSelect = ({ target }) => {
        setInfoSelect(target.textContent)
    }

    return (
        <main className="w-screen md:w-full bg-background m-2 grid place-items-center">
            <div className="flex flex-col w-full bg-white relative">
                {
                    openMenuHambuguer ?
                        <span onClick={()=> setOpenMenuHambuguer(false)} className="absolute z-[999] top-4 left-4 text-s2 text-red-700 cursor-pointer">X</span>
                        :
                        <GiHamburgerMenu onClick={()=> setOpenMenuHambuguer(true)} className="block md:hidden text-s2 ml-4 mt-4" />
                }
                <nav className={`w-full h-full md:h-auto absolute md:relative top-0 ${openMenuHambuguer ? "flex" : "hidden"} md:flex flex-col md:flex-row bg-white z-[998] md:z-0 pt-16 items-center gap-4 border-b-[1px] border-[#0002]`}>
                    {navLinks.map((link, key) =>
                        <button
                            onClick={handleInfoSelect}
                            className={`p-8 text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === link && "bg-color_primary text-white"}`}
                            key={key}>
                            {link}
                        </button>)
                    }
                    <button
                        onClick={(e) => { handleInfoSelect(e); navigate('/') }}
                        className={` p-8 text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === "Sair do painel" && "bg-color_primary text-white"}`}
                    >
                        Sair do painel
                    </button>
                </nav>
                <section className="flex flex-col w-full p-0 md:p-8 bg-white">
                    {user ?
                        <ActiveInformation user={user} infoSelect={infoSelect} />
                        :
                        <Loading />
                    }
                </section>
            </div>
        </main>
    )
}