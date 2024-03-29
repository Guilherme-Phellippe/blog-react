import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaEye, FaEyeSlash, FaSignInAlt, FaUserAlt } from "react-icons/fa";


import { useUserApi } from "../../../hooks/useApi";

import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input"
import { Loading } from "../../atoms/Loading/Loading"
import { UserContext } from "../../../contexts/userProvider";


export const FormLogin = () => {
    const { user } = useContext(UserContext)
    const [openEyePassword, setOpenEyePassword] = useState(false)
    const [typeInputPassword, setTypeInputPassword] = useState('password');
    const [loading, setLoading] = useState(false)
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const api = useRef(useUserApi());

    const navigate = useNavigate();

    useEffect(() => {
        inputPasswordRef.current.focus();
        openEyePassword ? setTypeInputPassword(() => 'text') : setTypeInputPassword(() => 'password');
    }, [openEyePassword]);

    useEffect(() => {
        if (user) navigate('/')
    }, [user, navigate])


    const handleButtonSignin = async (e) => {
        setLoading(true)
        e.preventDefault();

        if (inputEmailRef.current.value.length && inputPasswordRef.current.value.length) {
            const { data } = await api.current.authenticateUser(
                {
                    email: inputEmailRef.current.value.toLowerCase(),
                    password: inputPasswordRef.current.value
                }
            );

            if (data) {
                localStorage.setItem("token", JSON.stringify(data));
                navigate('/')
            } else alert("Usuario ou senha incorretos!")

        } else {
            inputPasswordRef.current.value = '';
            inputPasswordRef.current.focus();
            alert("Preencha todos os campos!")
        }
        setLoading(false)
    }

    const handleNextLine = (e) => {
        if (e.code === "Enter") {
            e.preventDefault()
            inputPasswordRef.current.focus()
        }
    }

    return (
        <form className="w-full mt-4 md:mt-0 md:w-1/2 md:order-2 flex flex-col items-center">
            <Input
                ref={inputEmailRef}
                label="E-MAIL:"
                placeholder="Digite seu e-mail..."
                onKeyDown={handleNextLine}
                icon={<FaUserAlt className="text-s1_5" />}
                customWidthAndMargin="w-[90%] md:w-[70%] my-10"
            />
            <Input
                ref={inputPasswordRef}
                label="SENHA:"
                placeholder="Digite sua senha..."
                type={typeInputPassword}
                customWidthAndMargin="w-[90%] md:w-[70%] my-10"
                eventIcon={() => setOpenEyePassword((value) => !value)}
                icon={openEyePassword ? <FaEye className="text-s1_5 cursor-pointer" /> : <FaEyeSlash className="text-s1_5 cursor-pointer" />}
            />
            <Button
                customClass={"btn-primary flex items-center justify-center gap-2 w-1/2 mt-4 p-4 text-s1_2 relative"}
                event={handleButtonSignin}
            >
                {loading && <Loading />}
                Entrar <FaSignInAlt />
            </Button>
        </form>
    )
}