import { Link } from 'react-router-dom'
import { Button } from '../../atoms/Button'

import './PanelUser.css'

export const PanelUser = ({ name_user = "Usuário" }) => {

    const IsLogged = name_user !== "Usuário" ? true : false

    return (
        <div className="container-login">
            <div className="info-profile">
                <div className="box-img">
                    <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt="imagem" />
                </div>
                <p>Bem vindo, <span>{name_user}</span></p>
            </div>
            {IsLogged ?
                <Button>Acessar painel</Button>
                :
                <>
                    <Link to={'/login'}>
                        <Button customClass={"btn-primary mt-4 px-8"}>Faça seu login</Button>
                    </Link>
                    <span>ou</span>
                    <Link to={'/register'}>
                        <p className='cursor-pointer text-color_second font-bold'>Registre-se</p>
                    </Link>
                </>}

        </div>
    )
}