import { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Button } from "../../atoms/Button";


export const FormLogin = () => {
    const [openEyePassword, setOpenEyePassword] = useState(false)
    const [typeInputPassword, setTypeInputPassword] = useState('password');
    const inputPasswordRef = useRef();

    useEffect(() => {
        inputPasswordRef.current.focus();
        openEyePassword ? setTypeInputPassword(() => 'text') : setTypeInputPassword(() => 'password');
    }, [openEyePassword]);

    const handleButtonSignin = (e) =>{
        e.preventDefault();
        inputPasswordRef.current.value = '';
        inputPasswordRef.current.focus();
    }

    return (
        <form className="w-1/2 flex flex-col items-center">
            <h3 className="text-s1_5 mb-4">Entre com sua conta:</h3>
            <div className="w-2/3 flex items-center border-[1px] border-solid hover:border-color_second m-2 bg-background rounded-xl">
                <input
                    className="w-[85%] p-4 outline-none bg-transparent text-s1_2"
                    type="text"
                    placeholder="EMAIL:" />
                <div className="w-[15%] h-full flex justify-center items-center">
                    <FaUserAlt className="text-s1_5" />
                </div>
            </div>
            <div className="w-2/3 flex items-center border-[1px] border-solid hover:border-color_second m-2 bg-background rounded-xl">
                <input
                    ref={inputPasswordRef}
                    className="w-[85%] p-4 outline-none bg-transparent text-s1_2"
                    type={typeInputPassword}
                    placeholder="SENHA:" />
                <div
                    className="w-[15%] h-full flex justify-center items-center cursor-pointer"
                    onClick={() => setOpenEyePassword((value) => !value)}
                >
                    {openEyePassword ? <FaEye className="text-s1_5" /> : <FaEyeSlash className="text-s1_5" />}
                </div>
            </div>
            <Button 
                customClass={"btn-primary flex items-center justify-center gap-2 w-1/2 mt-4 p-4 text-s1_2"}
                event={handleButtonSignin}
            >Entrar <FaSignInAlt /></Button>
        </form>
    )
}