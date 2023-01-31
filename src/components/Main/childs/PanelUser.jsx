import { Button } from "../../utils/Button"

import './PanelUser.css'

export const PanelUser = ({ name_user = "Usuário"}) => {

    const IsLogged = name_user !== "Usuário" ? true:false

    return (
        <div className="container-login">
            <div className="info-profile">
                <div className="box-img">
                    <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt="imagem" />
                </div>
                <p>Bem vindo, <span>{name_user}</span></p>
            </div>
            { IsLogged ? 
                <Button text="Acessar painel"/>
                : 
                <>
                    <Button text="Faça seu login"/>
                    <span>---- ou ----</span>
                    <a href="#">Registre-se</a>
                </>}
            
        </div>
    )
}