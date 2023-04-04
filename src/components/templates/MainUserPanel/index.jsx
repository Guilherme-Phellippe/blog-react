import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { Loading } from "../../../components/atoms/Loading/Loading"
import { ActiveInformation } from "../../organisms/ActiveInformation"
import { useUserApi } from "../../../hooks/useApi"

export const MainUserPanel = () => {
    const navLinks = ["Meus dados", "Minhas receitas", "Receitas salvas", "Notificações"];
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const [infoSelect, setInfoSelect] = useState(navLinks[0]);
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

    const handleInfoSelect = ({ target }) => {
        refNav.current.scrollTo({left: (target.offsetLeft - target.clientWidth) , behavior: "smooth"});
        setInfoSelect(target.textContent)
    }

    return (
        <main className="w-screen md:w-full max-w-[1500px] mx-auto bg-background m-2 grid place-items-center">
            <nav ref={refNav} className={`w-full snap-x snap-mandatory overflow-auto md:overflow-hidden flex bg-white md:pt-16 items-center gap-4 border-b-[1px] border-[#0002]`}>
                <div className=""></div>
                {navLinks.map((link, key) =>
                    <button
                        onClick={handleInfoSelect}
                        className={`p-8 w-1/3 snap-center flex-none text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === link && "bg-color_primary text-white"}`}
                        key={key}>
                        {link}
                    </button>)
                }
                <button
                    onClick={(e) => { handleInfoSelect(e); navigate('/') }}
                    className={`p-8 w-1/3 snap-center flex-none text-s1_2 hover:bg-color_second hover:text-white transition-all duration-1 ${infoSelect === "Sair do painel" && "bg-color_primary text-white"}`}
                >
                    Sair do painel
                </button>
            </nav>
            <section className="flex flex-col w-full p-0 md:p-8 bg-white overflow-y-auto">
                {user ?
                    <ActiveInformation user={user} infoSelect={infoSelect} />
                    :
                    <Loading />
                }
            </section>
        </main>
    )
}