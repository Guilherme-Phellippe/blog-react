import { FaPen } from 'react-icons/fa'
import { RiLightbulbFill, RiSendPlaneFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import { Button } from '../../../atoms/Button'
import { Input } from '../../../atoms/Input'

import './createfeed.css'

export const CreateFeed = () => {
    return (
        <div className="container-create-feed">
            <h3 className='w-full text-center text-s1_3'>Compartilhe conosco sua receita:</h3>
            <div className="photo-message">
                <div className="w-[10%] h-full rounded-full overflow-hidden">
                    <img className='w-full h-full object-cover' src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt="" />
                </div>
                <Input 
                    size={2}
                    placeholder={"Compartilhe sua receita conosco..."} 
                    icon={<FaPen className='fill-color_third text-s1_5' />} />
            </div>  
            <div className="flex justify-around">
                <Link to={'/create'}>
                    <Button customClass='btn-primary px-4 '>Publicar receita <RiSendPlaneFill /></Button>
                </Link>
                <Button customClass='btn-primary px-4 '>Dica de cozinha <RiLightbulbFill /></Button>
            </div>
        </div >
    )
}