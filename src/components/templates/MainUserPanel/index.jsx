import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Loading } from "../../../components/atoms/Loading/Loading"
import { ActiveInformation } from "../../organisms/ActiveInformation"
import { useUserApi } from "../../../hooks/useApi"

export const MainUserPanel = () => {
    const navLinks = ["Meus dados", "Minhas receitas","Receitas salvas", "Notificações"];
    const navigate = useNavigate()
    const [infoSelect, setInfoSelect] = useState(navLinks[0]);
    const [user, setUser] = useState();
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
            <div className="flex flex-col w-full bg-white">
                <nav className="w-full flex justify-center items-center gap-4 border-b-[1px] border-[#0002]">
                    {navLinks.map((link, key) =>
                        <button
                            onClick={handleInfoSelect}
                            className={`hidden md:block p-8 text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === link && "bg-color_primary text-white"}`}
                            key={key}>
                            {link}
                        </button>)
                    }
                    <button
                        onClick={(e) => { handleInfoSelect(e); navigate('/')}}
                        className={`hidden md:block p-8 text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === "Sair do painel" && "bg-color_primary text-white"}`}
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