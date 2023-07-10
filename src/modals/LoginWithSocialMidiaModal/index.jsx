import { useEffect, useRef, useState } from "react"
import { LoginWithSocialMidia } from "../../components/molecules/LoginWithSocialMidia"
import { Img } from "../../components/atoms/Img";

export default function LoginWithSocialMidiaModal() {
    const containerRef = useRef(null)
    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
        const userLogged = localStorage.getItem("token")
        if (!userLogged) {
            setShowContainer(true)
        }
    }, [])

    const closeModal = ({ target }) => {
        if (target.dataset.ref) containerRef.current.classList.add("hidden")
    }

    return (
        showContainer &&
        <div
            ref={containerRef}
            onClick={closeModal}
            data-ref={"container"}
            className="w-screen h-screen z-[999] bg-black/30 fixed top-0 left-0 flex items-end md:items-start md:justify-end"
        >
            <div className="w-full md:w-[500px] md:min-h-[350px] md:mt-32 md:mr-8 md:py-8 h-[30rem] rounded-t-xl md:rounded-xl bg-white p-4">
                <div className="w-full gap-4 flex justify-center items-center border-b-[1px] border-b-black/20 relative">
                    <span
                        data-ref={"container"}
                        className="absolute top-0 right-0 text-s1_7 font-bold font-sans cursor-pointer"
                    >X</span>
                    <div className="flex justify-center items-center">
                        <div className="w-4/5 flex justify-start">
                            <h2 className="text-s1_7 text-left text-color_text_black">Faça login<br />de forma rápida e fácil,<br />basta escolher sua rede social.</h2>
                        </div>
                        <div className="w-[100px]">
                            <Img
                                imgs={"https://i.ibb.co/q7QYwwk/Online-world-cuate-2-removebg-preview.png"}
                                alt={"Imagem com varias pessoas se conectando via rede social"}
                            />
                        </div>
                    </div>
                </div>
                <LoginWithSocialMidia redirect={window.location.pathname} />
            </div>
        </div>
    )
}