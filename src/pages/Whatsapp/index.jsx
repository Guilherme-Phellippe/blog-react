import { useContext } from "react"

import { UserContext } from '../../contexts/userProvider';
import { HomeProvider } from '../../contexts/Home/HomeProvider';
import Footer from "../../components/templates/Footer/Footer"
import Header from "../../components/templates/Header/Header";

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
                <h2 className="text-s3 font-bold p-4 text-color_orange w-full md:w-1/2  text-center ">Parabéns!</h2>
                <h3 className="text-s2 font-medium p-4  w-full md:w-1/2  text-center ">Você está muito perto de fazer parte do nosso grupo secreto de receitas!</h3>
                <p className="text-s1_7  w-full md:w-1/2  text-center ">
                    Compartilhamos diariamente as melhores receitas criadas pela Tem sabor.
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