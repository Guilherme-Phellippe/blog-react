import { Link, useNavigate } from 'react-router-dom'

import { formatTextLong } from '../../../scripts/formatTextLong'

import { BsFillGearFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';

import { Button } from '../../atoms/Button'


export const PanelUser = ({ name_user, photo }) => {
    const navigate = useNavigate()
    const IsLogged = name_user !== "Usuário" ? true : false

    return (
        <div className="w-full px-6 py-4 flex flex-col items-center border-b-[1px] border-solid border-rbga(24,24,24, .3)">
            <div className="w-full flex items-center gap-4">
                <div className="w-[25%]">
                    <img
                        src={photo ? photo : "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                        alt={name_user}
                        title={name_user}
                        className='w-full rounded-full object-contain'
                    />
                </div>
                <p className='text-s1_2 flex flex-col'>
                    Bem vindo, <span className='text-s1_5 text-color_primary'>{formatTextLong(name_user, 19)}</span>
                </p>
            </div>
            {IsLogged ?
                <div className='flex gap-4'>
                    <Link className="text-s1_3 my-4" to={'/panel-user'}>
                        <Button 
                        ><BsFillGearFill /> Acessar painel</Button>
                    </Link>
                    <Link className="text-s1_3 my-4" to={'/login'}>
                        <Button 
                            event={() => { localStorage.removeItem("token"); navigate('/');}}
                        ><ImExit /> Sair</Button>
                    </Link>

                </div>
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
