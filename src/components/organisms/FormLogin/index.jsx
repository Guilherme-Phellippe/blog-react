import { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../../contexts/Home/HomeProvider";
import { useUserApi } from "../../../hooks/useApi";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input"


export const FormLogin = () => {
    const { setUser } = useContext(HomeContext)
    const [openEyePassword, setOpenEyePassword] = useState(false)
    const [typeInputPassword, setTypeInputPassword] = useState('password');
    const [tokenLogin, setTokenLogin] = useState(JSON.parse(localStorage.getItem('token')));
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const api = useRef(useUserApi());

    const navigate = useNavigate();

    useEffect(() => {
        inputPasswordRef.current.focus();
        openEyePassword ? setTypeInputPassword(() => 'text') : setTypeInputPassword(() => 'password');
    }, [openEyePassword]);

    useEffect(() =>{
        (async () =>{
            if(tokenLogin){
                const user = await api.current.authenticateLogin()
                if(user){
                    setUser(user)
                    navigate('/')
                }
            }
        })();
    }, [tokenLogin, navigate, setUser])



    const handleButtonSignin = async (e) => {
        e.preventDefault();
        
        if (inputEmailRef.current.value.length && inputPasswordRef.current.value.length) {
            const { data } = await api.current.authenticateUser(
                {
                    email: inputEmailRef.current.value,
                    password: inputPasswordRef.current.value
                }
            );

            
            if(data){
                localStorage.setItem("token", JSON.stringify(data));
                setTokenLogin(JSON.parse(localStorage.getItem('token')));
            } else alert("Usuario ou senha incorretos!")

        }else{
            inputPasswordRef.current.value = '';
            inputPasswordRef.current.focus();
            alert("Preencha todos os campos!")
        }
        
    }

    return (
        <form className="w-1/2 flex flex-col items-center">
            <h3 className="text-s1_5 mb-4">Entre com sua conta:</h3>
            <Input
                ref={inputEmailRef}
                label="E-MAIL:"
                placeholder="Digite seu e-mail..."
                icon={<FaUserAlt className="text-s1_5" />}
                size={2}
            />
            <Input
                ref={inputPasswordRef}
                label="SENHA:"
                placeholder="Digite sua senha..."
                type={typeInputPassword}
                size={2}
                eventIcon={() => setOpenEyePassword((value) => !value)}
                icon={openEyePassword ? <FaEye className="text-s1_5 cursor-pointer" /> : <FaEyeSlash className="text-s1_5 cursor-pointer" />}
            />
            <Button
                customClass={"btn-primary flex items-center justify-center gap-2 w-1/2 mt-4 p-4 text-s1_2"}
                event={handleButtonSignin}
            >
                Entrar <FaSignInAlt />
            </Button>
        </form>
    )
}