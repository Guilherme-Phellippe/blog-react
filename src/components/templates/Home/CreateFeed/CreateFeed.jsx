import { useState } from 'react'
import { FaPen } from 'react-icons/fa'
import { RiAccountBoxFill, RiLightbulbFill, RiSendPlaneFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { DialogConfirm } from '../../../../modals/DialogConfirm'

import { Button } from '../../../atoms/Button'
import { Input } from '../../../atoms/Input'

import './createfeed.css'

export const CreateFeed = ({ user }) => {

    const navigate = useNavigate();
    const [valueInput, setValueInput] = useState('');
    const [openModalDialog, setModalDialog] = useState(false);
    const [containerConfirm, setContainerConfirm] = useState();


    const handleCanCreateRecipe = () => {
        console.log(user)
        if (user) {
            navigate(`/create/?n=${valueInput}`)
        } else {
            setContainerConfirm({
                function: setModalDialog(true),
                type: 1,
                message: "Você precisa criar uma conta antes de publicar um receita!",
                button:{
                    icon: <RiAccountBoxFill />,
                    title:"Criar conta",
                    event:()=> navigate('/register')
                }
            })
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
                    placeholder={"Digite o nome da sua receita..."}
                    icon={<FaPen className='fill-color_third text-s1_5' />}
                />
            </div>
            <div className="flex justify-around">
                <Button
                    customClass='btn-primary px-4'
                    event={handleCanCreateRecipe}
                >Publicar receita <RiSendPlaneFill /></Button>
                <Button customClass='btn-primary px-4 '>Dica de cozinha <RiLightbulbFill /></Button>
            </div>

            {
                openModalDialog && <DialogConfirm
                    open={{ openModalDialog, setModalDialog }}
                    container={ containerConfirm }
                />
            }
        </div >
    )
}
