import './createfeed.css'
import { RiLightbulbFill, RiSendPlaneFill } from 'react-icons/ri'
import { Button } from '../../../atoms/Button'

export const CreateFeed  = () => { 
    return(
         <div className="container-create-feed">
            <div className="photo-message">
                <div className="photo">
                    <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt="" />
                </div>
                <input type="text" placeholder="Compartilhe sua receita conosco..." />
            </div>
            <div className="options">
                <Button typeButton={'primary'} style={{padding:'.5rem 2rem'}}>Dica de cozinha <RiLightbulbFill /></Button>
                <Button typeButton={'second'} style={{padding:'.5rem 2rem'}}>Publicar receita <RiSendPlaneFill /></Button>
            </div>
         </div>
    )
}