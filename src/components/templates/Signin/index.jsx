
import { Button } from "../../atoms/Button"
import { LoginWithSocialMidia } from "../../molecules/LoginWithSocialMidia"
import { FormLogin } from "../../organisms/FormLogin"

export const Signin = ({ setIsLogin }) => {


    return (
        <div className="w-full bg-white p-4">
            <h2 className="text-center font-bold text-s2 text-color_second p-4">Acessar sua conta</h2>
            <div className="w-full flex">
                <div className="flex flex-col items-center justify-evenly w-1/2 border-r-[1px] border-solid border-gray-500">
                    <LoginWithSocialMidia />
                </div>
                <FormLogin />
            </div>
            <div className="flex flex-col justify-center items-center m-16">
                <Button customClass={"text-color_primary font-bold text-s1_2"}>Esqueceu sua senha?</Button>
                <hr className="w-1/3 my-8" />
                <Button customClass={"text-color_primary font-bold text-s1_2"} event={() => setIsLogin(() => false)}>Ainda não tem uma conta?</Button>
            </div>
        </div>
    )
}