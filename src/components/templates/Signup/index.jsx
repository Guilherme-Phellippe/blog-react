import { useRef, useState } from 'react'

import { FaUserCheck, FaLock, FaCheckCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import { Input } from "../../atoms/Input"
import { Button } from '../../atoms/Button';
import { LoginWithSocialMidia } from '../../molecules/LoginWithSocialMidia';
import { useNotificationApi, useUserApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { dialog } from '../../../modals/Dialog';
import { Loading } from '../../atoms/Loading/Loading';

export const Singup = ({ setIsLogin }) => {
    const notificationApi = useNotificationApi()
    const apiUser = useRef(useUserApi());
    const refForm = useRef(null)
    const [whatColorIconName, setWhatColorIconName] = useState(null);
    const [whatColorIconEmail, setWhatColorIconEmail] = useState(null);
    const [whatColorIconPassword, setWhatColorIconPassword] = useState(null);
    const [valueFirstInputPassword, setValueFirstInputPassword] = useState('')
    const navigate = useNavigate()
    const refCheckPolicyAndTerms = useRef(null);
    const [loading, setLoading] = useState(false)
    const RED = "text-red-800";
    const GREEN = "text-green-500";


    const handleCheckInputs = ({ target }) => {
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
        setLoading(true)
        e.preventDefault();
        const user = {
            name: '',
            email: '',
            password: '',
        }
        if (whatColorIconName === GREEN) {
            if (whatColorIconEmail === GREEN) {
                if (whatColorIconPassword === GREEN) {
                    if (refCheckPolicyAndTerms.current.checked) {
                        user.name = refForm.current.querySelector("input#name").value
                        user.email = refForm.current.querySelector("input#email").value
                        user.password = refForm.current.querySelector("input#password").value

                        const response = await apiUser.current.createNewUser(user)
                        if (!response.error) {
                            notificationApi.newNotificationAlreadyExist("e7682967-ea1e-4b46-8d2c-d1621dac5dd1", response.id)
                            localStorage.setItem('token', JSON.stringify(response))
                            navigate('/')
                        } else dialog("Usuário já possui uma conta!", 1)
                    } else dialog("Você não poderá criar uma conta na tem sabor sem concordar com nossas Politicas privacidade e nossos termos de uso.", 1)
                } else dialog("Senha incompatível ou muito pequena", 1)
            } else dialog("E-mail invalído!", 1)
        } else dialog("Nome e sobrenome invalídos!", 1)

        setLoading(false)
    }


    return (
        <div className="w-full bg-white p-4 md:p-16">
            <h2 className="text-center font-bold text-s2 text-color_red p-4 mb-4">Crie uma conta rápido e fácil</h2>
            <div className="w-full flex flex-col items-center">
                <form
                    ref={refForm}
                    className="w-full md:w-5/6 flex flex-col items-center mb-12"
                    action=""
                >
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="name"
                        placeholder={'DIGITE SEU NOME E SOBRENOME:'}
                        type={'text'}
                        customWidthAndMargin="w-[80%]  md:w-[50%]  md:w-[50%] my-6"
                        icon={<FaUserCheck className={`text-s1_5 ${whatColorIconName}`} />}
                    />
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="email"
                        placeholder={'DIGITE SEU EMAIL:'}
                        type={'text'}
                        customWidthAndMargin="w-[80%] md:w-[50%] my-6"
                        icon={<MdEmail className={`text-s1_5 ${whatColorIconEmail}`} />} />
                    <div className="flex flex-col items-center justify-center md:flex-row w-[80%] md:w-1/2 gap-4 ">
                        <Input
                            onChange={(e) => setValueFirstInputPassword(e.target.value)}
                            placeholder={'DIGITE SUA SENHA:'}
                            type={'password'}
                            customWidthAndMargin="w-full md:w-[50%] my-6"
                        />
                        <Input
                            onChange={(e) => handleCheckInputs(e)}
                            id="password"
                            placeholder={'CONFIRME SUA SENHA:'}
                            type={'password'}
                            customWidthAndMargin="w-full md:w-[50%] my-6"
                            icon={<FaLock className={`text-s1_3 ${whatColorIconPassword}`} />} />
                    </div>

                    <div className="flex my-8 w-5/6 md:w-1/2">
                        <input
                            ref={refCheckPolicyAndTerms}
                            type="checkbox"
                            className='mx-4 cursor-pointer w-14 md:w-10 bg-red-500'
                        />
                        <span className='text-s1_2'>
                            Confirme que leu e aceita nossas
                            <a
                                href="/policy"
                                className='text-blue-900 hover:text-blue-500 cursor-pointer'
                                target='_blank'
                            > Políticas Privacidade </a>
                            e nossos
                            <a
                                href="/terms"
                                className='text-blue-900 hover:text-blue-500 cursor-pointer'
                                target='_blank'
                            > Termos de uso </a>.
                        </span>
                    </div>
                    <Button
                        event={handleCreateNewUser}
                        customClass={'btn-primary px-16 mt-8 flex justify-center items-center gap-2 text-s1_4'}
                    >
                        {
                            loading && <Loading />
                        }
                        Criar conta <FaCheckCircle />
                    </Button>
                    <hr className='w-1/3 mt-8' />
                    <Button
                        event={() => setIsLogin(true)}
                        customClass={'underline mt-8 flex justify-center items-center gap-2 text-s1_4'}>
                        Já tem uma conta?
                    </Button>
                </form>
                <hr className='w-1/3 mb-4' />
                <LoginWithSocialMidia />
            </div>
        </div>
    )
}