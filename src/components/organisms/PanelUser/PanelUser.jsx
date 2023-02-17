import { Link } from 'react-router-dom'
import { Button } from '../../atoms/Button'

export const PanelUser = ({ name_user = "Usuário" }) => {

    const IsLogged = name_user !== "Usuário" ? true : false

    return (
        <div className="w-full p-2 flex flex-col items-center border-b-[1px] border-solid border-rbga(24,24,24, .3)">
            <div className="w-full flex justify-center items-center gap-4">
                <div className="w-[25%]">
                    <img
                        src="https://www.procurandocraques.com/static/img/admin/user-profile.png"
                        alt="imagem"
                        className='w-full rounded-full object-contain'
                    />
                </div>
                <p className='text-s1_2 flex flex-col'>
                    Bem vindo, <span className='text-s1_5 text-color_primary'>{name_user}</span>
                </p>
            </div>
            {IsLogged ?
                <Button>Acessar painel</Button>
                :
                <>
                    <Link className="text-s1_3 text-color_primary my-2" to={'/login'}>
                        <Button customClass={"btn-primary mt-4 px-8"}>Faça seu login</Button>
                    </Link>
                    <span>ou</span>
                    <Link className="text-s1_3 text-color_primary my-2" to={'/register'}>
                        <p className='cursor-pointer text-color_second font-bold'>Registre-se</p>
                    </Link>
                </>}

        </div>
    )
}
