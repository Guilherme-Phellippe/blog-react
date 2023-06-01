import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { RiLightbulbFill, RiSendPlaneFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import { dialog } from '../../../modals/Dialog'

import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'

import './createfeed.css'

export default function CreateFeed({ user }) {

    const navigate = useNavigate();
    const [valueInput, setValueInput] = useState('');

    const handleCanCreateRecipe = async () => {
        if (user) {
            navigate(`/create/?n=${valueInput}`)
        } else {
            const response = await dialog("Você precisa criar uma conta antes de publicar um receita!", 1, "Criar conta")
            if (response) navigate('/register');
        }

    }
    const handleCanCreateTip = async () => {
        if (user) {
            navigate(`/create-tip/?n=${valueInput}`)
        } else {
            const response = await dialog("Você precisa criar uma conta antes de publicar um receita!", 1, "Criar conta")
            if (response) navigate('/register');
        }

    }


    return (
        <div className="container-create-feed">
            <h3 className='w-full text-center text-s1_3'>Compartilhe conosco sua receita:</h3>
            <div className="w-full h-[60%] overflow-hidden p-4 flex justify-center items-center">
                <div className="w-[50px] h-[50px] flex justify-center items-center">
                    <img
                        className='w-[80%] h-[80%] object-cover rounded-full'
                        src={user ? user.photo : "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                        alt=""
                    />
                </div>
                <Input
                    onChange={(e) => setValueInput(e.target.value)}
                    customWidthAndMargin="w-[80%]"
                    placeholder={"Digite o nome da sua receita ou dica..."}
                    icon={<FaPen className='fill-color_red text-s1_5' />}
                />
            </div>
            <div className="flex justify-around">
                <Button
                    customClass='flex items-center font-semi-bold text-color_text_black p-4 rounded-xl gap-4 text-s1_1 hover:bg-gray-200/80'
                    event={handleCanCreateRecipe}
                >
                    Publicar receita <RiSendPlaneFill className='fill-blue-800' />
                </Button>
                <Button
                    customClass='flex items-center font-semi-bold text-color_text_black p-4 rounded-xl gap-4 text-s1_1 hover:bg-gray-200/80 '
                    event={handleCanCreateTip}
                >
                    Publicar dica <RiLightbulbFill className='fill-yellow-800' />
                </Button>
            </div>
        </div >
    )
}
