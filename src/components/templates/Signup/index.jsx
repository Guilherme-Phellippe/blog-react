import { useRef, useState } from 'react'

import { FaUserCheck, FaLock, FaCheckCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { Input } from "../../atoms/Input"
import { Button } from '../../atoms/Button';
import { LoginWithSocialMidia } from '../../molecules/LoginWithSocialMidia';
import { useUserApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

export const Singup = ({ setIsLogin }) => {
    const apiUser = useRef(useUserApi());
    const refForm = useRef(null)
    const [whatColorIconName, setWhatColorIconName] = useState(null);
    const [whatColorIconEmail, setWhatColorIconEmail] = useState(null);
    const [whatColorIconPassword, setWhatColorIconPassword] = useState(null);
    const [valueFirstInputPassword, setValueFirstInputPassword] = useState('')
    const navigate = useNavigate()



    const handleCheckInputs = ({ target }) => {
        const RED = "text-red-800";
        const GREEN = "text-green-500";

        switch (target.id) {
            case 'name': {
                let names = target.value.split(" ");
                if (names[0]?.length > 0 && names[1]?.length > 0) {
                    setWhatColorIconName(GREEN)
                } else setWhatColorIconName(RED)
                break;
            };
            case 'email': {
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (regex.test(target.value)) {
                    setWhatColorIconEmail(GREEN)
                } else setWhatColorIconEmail(RED)
                break;
            };
            case 'password': {
                if (target.value.length > 6) {
                    if (valueFirstInputPassword === target.value) {
                        setWhatColorIconPassword(GREEN)
                    } else setWhatColorIconPassword(RED);
                } else setWhatColorIconPassword(RED);
                break;
            }
            default: throw new Error("this element not have a 'id'");
        }
    }

    const handleCreateNewUser = async (e) => {
        e.preventDefault();
        const user = {
            name: '',
            email: '',
            password: '',
        }



        if (whatColorIconName) {
            if (whatColorIconEmail) {
                if (whatColorIconPassword) {
                    user.name = refForm.current.querySelector("input#name").value
                    user.email = refForm.current.querySelector("input#email").value
                    user.password = refForm.current.querySelector("input#password").value

                    const response = await apiUser.current.createNewUser(user)
                    if (!response.error){
                        localStorage.setItem('token', JSON.stringify(response))
                        navigate('/')
                    }else alert("Usuário já possui uma conta!")

                } else alert("Senha incompatível ou muito pequena")
            } else alert("E-mail invalído!")
        } else alert("Nome e sobrenome invalídos!")
    }


    return (
        <div className="w-full bg-white p-16">
            <h2 className="text-center font-bold text-s2 text-color_second p-4 mb-4">Crie uma conta rápido e fácil</h2>
            <div className="w-full flex flex-col items-center">
                <div className="flex gap-16">
                    <LoginWithSocialMidia />
                </div>
                <hr className='w-1/3 m-12' />
                <form 
                    ref={refForm}
                    className="w-5/6 flex flex-col items-center" 
                    action=""
                >
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="name"
                        placeholder={'DIGITE SEU NOME E SOBRENOME:'}
                        type={'text'}
                        size={1}
                        icon={<FaUserCheck className={`text-s1_5 ${whatColorIconName}`} />}
                    />
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="email"
                        placeholder={'DIGITE SEU EMAIL:'}
                        type={'text'}
                        size={1}
                        icon={<MdEmail className={`text-s1_5 ${whatColorIconEmail}`} />} />
                    <div className="flex w-1/2 justify-center">
                        <Input
                            onChange={(e) => setValueFirstInputPassword(e.target.value)}
                            placeholder={'DIGITE SUA SENHA:'}
                            type={'password'}
                            size={1}
                        />
                        <Input
                            onChange={(e) => handleCheckInputs(e)}
                            id="password"
                            placeholder={'CONFIRME SUA SENHA:'}
                            type={'password'}
                            size={1}
                            icon={<FaLock className={`text-s1_3 ${whatColorIconPassword}`} />} />
                    </div>
                    <Button
                        event={handleCreateNewUser}
                        customClass={'btn-primary px-16 mt-8 flex justify-center items-center gap-2 text-s1_2'}>
                        Criar conta <FaCheckCircle />
                    </Button>
                    <hr className='w-1/3 mt-8' />
                    <Button
                        event={() => setIsLogin(true)}
                        customClass={'underline mt-8 flex justify-center items-center gap-2 text-s1_2'}>
                        Já tem uma conta?
                    </Button>


                </form>
            </div>
        </div>
    )
}