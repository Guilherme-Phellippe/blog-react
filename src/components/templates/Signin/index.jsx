
import { Button } from "../../atoms/Button"
import { LoginWithSocialMidia } from "../../molecules/LoginWithSocialMidia"
import { FormLogin } from "../../organisms/FormLogin"

export const Signin = ({ setIsLogin }) => {


    return (
        <div className="w-full bg-white p-4">
            <h2 className="text-center font-bold text-s2 text-color_red p-4">Acessar sua conta</h2>
            <div className="w-full flex items-center flex-col md:flex-row md:mt-16">
                <FormLogin />
                <div className="w-2/3 md:w-1/2 md:px-44 md:order-1 flex flex-col items-center justify-evenly gap-4 md:gap-16 my-8 md:m-0 md:border-r-[1px] border-gray-500">
                    <LoginWithSocialMidia />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center m-16">
                {/* <Button customClass={"text-color_orange font-bold text-s1_2"}>Esqueceu sua senha?</Button> */}
                <hr className="w-1/3 my-8" />
                <Button customClass={"text-color_orange font-bold text-s1_2"} event={() => setIsLogin(() => false)}>Ainda não tem uma conta?</Button>
            </div>
        </div>
    )
}