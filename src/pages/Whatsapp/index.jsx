import { useContext, useEffect } from "react"

import { UserContext } from '../../contexts/userProvider';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import Footer from "../../components/templates/Footer/Footer"
import Header from "../../components/templates/Header/Header";

import { Img } from "../../components/atoms/Img"
import { Button } from "../../components/atoms/Button";
import { FaSignInAlt } from "react-icons/fa";

const Whatsapp = () => {
    const { user } = useContext(UserContext)

    const handleClickButton = () => {
        window.open("https://chat.whatsapp.com/KjhJHHrLE8IL5puyaKtvzK")
    }

    return (
        <HomeProvider>
            <Header user={user} />
            <main className="w-full max-w-[1600px] mx-auto bg-white flex flex-col items-center">
                <div className="flex w-full md:w-1/2 mx-auto">
                    <Img imgs={"https://i.ibb.co/4dz4GyX/Grupo-secreto-de-receitas.webp"} />
                </div>
                <p className="text-s2 font-medium leading-[3rem] w-full md:w-1/2  text-center my-12">
                    Entre agora mesmo em nosso grupo do whatsapp, onde compartilhamos diariamente
                    as melhores receitas criadas pela Tem sabor.
                </p>

                <Button event={handleClickButton} customClass="btn-primary p-4 px-8 text-s2 my-8">Entrar no grupo <FaSignInAlt /> </Button>
            </main>
            <Footer />

            {/* MODAL LOGIN WITH SOCIAL MIDIA  */}
            {/* <LoginWithSocialMidiaModal /> */}
        </HomeProvider>
    )
}

export default Whatsapp