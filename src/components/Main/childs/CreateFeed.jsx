import './createfeed.css'
import { RiLightbulbFill, RiSendPlaneFill } from 'react-icons/ri'

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
                <button>Publicar receita <RiSendPlaneFill /></button>
                <button>Dica de cozinha <RiLightbulbFill /></button>
            </div>
         </div>
    )
}