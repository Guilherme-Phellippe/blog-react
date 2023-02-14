import { useState } from 'react'

import { Input } from "../../atoms/Input"
import { FaUserCheck, FaLock, FaCheckCircle } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Button } from '../../atoms/Button';
import { LoginWithSocialMidia } from '../../molecules/LoginWithSocialMidia';

export const Singup = ({ setIsLogin }) => {
    const [isCorrectName, setIsCorrectName] = useState('');
    const [isCorrectEmail, setIsCorrectEmail] = useState('');
    const [isCorrectPassword, setIsCorrectPassword] = useState('');
    const [valueFirstInputPassword, setValueFirstInputPassword] = useState('')

    const handleCheckInputs = ({ target }) => {
        const RED = "text-red-800"
        const GREEN = "text-green-500"


        switch (target.id) {
            case 'name': {
                let names = target.value.split(" ");
                if (names[0]?.length > 0 && names[1]?.length > 0) setIsCorrectName(GREEN)
                else setIsCorrectName(RED)
                break;
            };
            case 'email': {
                const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (regex.test(target.value)) setIsCorrectEmail(GREEN)
                else setIsCorrectEmail(RED)
                break;
            };
            case 'password': valueFirstInputPassword === target.value ? setIsCorrectPassword(GREEN) : setIsCorrectPassword(RED); break;
            default: throw new Error("this element not have a 'id'");
        }
    }


    return (
        <div className="w-full bg-white p-4">
            <h2 className="text-center font-bold text-s2 text-color_second p-4 mb-4">Crie uma conta rápido e fácil</h2>
            <div className="w-full flex flex-col items-center">
                <div className="flex gap-16">
                    <LoginWithSocialMidia />
                </div>
                <hr className='w-1/3 m-12' />
                <form className="w-5/6 flex flex-col items-center" action="">
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="name"
                        placeholder={'DIGITE SEU NOME E SOBRENOME:'}
                        type={'text'}
                        size='medium'
                        icon={<FaUserCheck className={`text-s1_5 ${isCorrectName}`} />}
                    />
                    <Input
                        onChange={(e) => handleCheckInputs(e)}
                        id="email"
                        placeholder={'DIGITE SEU EMAIL:'}
                        type={'text'}
                        size='medium'
                        icon={<MdEmail className={`text-s1_5 ${isCorrectEmail}`} />} />
                    <div className="flex w-full justify-center">
                        <Input
                            onChange={(e) => setValueFirstInputPassword(e.target.value)}
                            placeholder={'DIGITE SUA SENHA:'}
                            type={'password'}
                            size='small'
                        />
                        <Input
                            onChange={(e) => handleCheckInputs(e)}
                            id="password"
                            placeholder={'CONFIRME SUA SENHA:'}
                            type={'password'}
                            size='small'
                            icon={<FaLock className={`text-s1_3 ${isCorrectPassword}`} />} />
                    </div>
                    <Button
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