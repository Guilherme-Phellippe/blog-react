import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Loading } from "../../../components/atoms/Loading/Loading"
import { ActiveInformation } from "../../organisms/ActiveInformation"
import { useUserApi } from "../../../hooks/useApi"
import { MdExitToApp, MdList, MdNotifications, MdPhotoLibrary, MdSave } from "react-icons/md";

export const MainUserPanel = () => {
    const navLinks = [
        { name: "Perfil", icon: <MdPhotoLibrary className="text-s2 md:text-s1_4" /> },
        { name: "Receitas", icon: <MdList className="text-s2 md:text-s1_4" /> },
        { name: "Dicas", icon: <MdList className="text-s2 md:text-s1_4" /> },
        { name: "Salvos", icon: <MdSave className="text-s2 md:text-s1_4" /> },
        { name: "Notificações", icon: <MdNotifications className="text-s2 md:text-s1_4" /> },
    ];
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const [infoSelect, setInfoSelect] = useState(navLinks[0].name);
    const refUserApi = useRef(useUserApi())
    const token = localStorage.getItem("token")
    const refNav = useRef()

    useEffect(() => {
        if (token) {
            (async () => {
                const user = await refUserApi.current.authenticateLogin()
                setUser(user.data)
            })()
        } else navigate('/')
    }, [token, navigate]);

    const handleInfoSelect = ({ currentTarget: target }) => {
        const text = target.querySelector("p").textContent
        if (window.innerWidth <= 770) {
            if (text === "Meus dados" || text === "Minhas receitas") refNav.current.scrollTo({ left: (target.offsetLeft - 40), behavior: "smooth" });
            else refNav.current.scrollTo({ left: (target.offsetLeft - target.clientWidth), behavior: "smooth" });
        }
        setInfoSelect(text)
    }

    return (
        <main className="w-screen md:w-full max-w-[1500px] mx-auto bg-background m-2">
            <div className="flex flex-col w-full min-h-[500px] bg-white">
                <nav ref={refNav} className={`w-full snap-x snap-mandatory overflow-auto md:overflow-hidden flex bg-white md:pt-16 items-center gap-4 border-b-[1px] border-[#0002]`}>
                    {navLinks.map((link, key) =>
                        <button
                            onClick={handleInfoSelect}
                            className={`p-8 w-1/6 snap-center flex-none flex items-center gap-2 text-s1_2 hover:bg-color_orange hover:text-white transition-all duration-1 ${infoSelect === link.name && "bg-color_orange text-white"} relative`}
                            key={key}
                        >
                            <div className="relative">
                                {link.icon}
                                {
                                    !!user?.notificationUser.length && link.name === "Notificações" &&
                                    <span className="absolute -top-2 -right-1 bg-color_orange px-1 text-white rounded-full">
                                        {
                                            user.notificationUser.reduce((total, current) =>
                                                total + current.read ? 0 : 1, 0
                                            )

                                        }
                                    </span>
                                }
                            </div>
                            <p className={`${infoSelect === link.name ? "text-white" : "text-color_text"}`}>{link.name}</p>
                        </button>)
                    }
                    <button
                        onClick={(e) => { handleInfoSelect(e); navigate('/') }}
                        className={`p-8 w-2/5 snap-center flex-none flex items-center gap-2 text-s1_2 hover:bg-color_red hover:text-white transition-all duration-1 ${infoSelect === "Sair do painel" && "bg-color_orange text-white"}`}
                    >
                        <MdExitToApp className="text-s2 md:text-s1_4" />
                        <p className={`${infoSelect === "Sair do painel" && "text-white"}`}>Sair do painel</p>
                    </button>
                </nav>
                <section className="flex flex-col w-full py-4 md:p-8 bg-white overflow-y-auto">
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