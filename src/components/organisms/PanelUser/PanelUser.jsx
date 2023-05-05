import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';

import { formatTextLong } from '../../../scripts/formatTextLong'

import { BsFillGearFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';

import { Button } from '../../atoms/Button'
import { Img } from '../../atoms/Img';
import { HomeContext } from '../../../contexts/Home/HomeProvider';


export const PanelUser = ({ isMobile }) => {
    const { user } = useContext(HomeContext)
    const navigate = useNavigate();
    const numberNotifications = useRef(0)


    useEffect(() => {
        if (user) {
            const result = user.notificationUser.reduce((total, current) =>
                total + current.read ? 0 : 1, 0
            );
            numberNotifications.current = result
        }
    }, [user])

    return (
        <div className="w-full px-6 py-4 flex flex-col items-center relative">
            <>
                <Link to={'/panel-user'}>
                    <div className="w-full flex justify-center items-center gap-4">
                        <div className="w-[50px] h-[50px] relative">
                            <div className="rounded-full overflow-hidden">
                                <Img
                                    imgs={user?.photo || "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                                    alt={user?.name || "Usuário"}
                                    title={user?.name || "Usuário"}
                                />
                            </div>
                            {
                                numberNotifications.current !== 0 &&
                                <span className='absolute -top-0 -right-0 px-2 py-1 rounded-full bg-color_orange text-white text-s1_2'>
                                    {numberNotifications.current}
                                </span>
                            }
                        </div>
                        <p className='text-s1_2 flex flex-col'>
                            Bem vindo, <span className='text-s1_5 text-color_orange'>{formatTextLong(user?.name || "Usuário", 18)}</span>
                        </p>
                    </div>
                </Link>
                {user ?
                    <div className={`${isMobile ? "hidden" : "flex"} gap-4`}>
                        <Link className="text-s1_3 my-4" to={'/panel-user'}>
                            <Button
                            ><BsFillGearFill /> Acessar painel</Button>
                        </Link>
                        <Link className="text-s1_3 my-4" to={'/login'}>
                            <Button
                                event={() => { localStorage.removeItem("token"); navigate('/'); }}
                            ><ImExit /> Sair</Button>
                        </Link>

                    </div>
                    :
                    <>
                        <Link className="text-s1_3 text-color_orange my-2" to={'/login'}>
                            <Button customClass={"btn-primary mt-4 px-8"}>Faça seu login</Button>
                        </Link>
                        <span>ou</span>
                        <Link className="text-s1_3 text-color_orange my-2" to={'/register'}>
                            <p className='cursor-pointer text-color_red font-bold'>Registre-se</p>
                        </Link>
                    </>}
            </>
        </div>
    )
}
