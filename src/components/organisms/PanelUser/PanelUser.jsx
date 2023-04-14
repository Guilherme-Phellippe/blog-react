import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';

import { formatTextLong } from '../../../scripts/formatTextLong'

import { BsFillGearFill } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';

import { useUserApi } from '../../../hooks/useApi';

import { Button } from '../../atoms/Button'
import { Loading } from '../../atoms/Loading/Loading'


export const PanelUser = ({ isMobile }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "Usuário", photo: "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png", isFalse: true })
    const [loading, setLoading] = useState(false)
    const numberNotifications = useRef(0)
    const refUserApi = useRef(useUserApi())
    const IsLogged = user.isFalse ? false : true

    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await refUserApi.current.authenticateLogin();
            if (data) {
                const result = data.data.notificationUser.reduce((total, current) =>
                    total + current.read ? 0 : 1, 0
                );
                numberNotifications.current = result
                setUser(data.data);
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className="w-full px-6 py-4 flex flex-col items-center relative">
            {loading ?
                <div className="h-[50px] flex justify-center relative">
                    <Loading />
                </div>
                :
                <>

                    <Link to={'/panel-user'}>
                        <div className="w-full flex justify-center items-center gap-4">
                            <div className="w-[50px] h-[50px] relative">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    title={user.name}
                                    className='w-full h-full rounded-full object-cover'
                                />
                                {
                                    numberNotifications.current !== 0 &&
                                    <span className='absolute -top-0 -right-0 px-2 py-1 rounded-full bg-color_primary text-white text-s1_2'>
                                        {numberNotifications.current}
                                    </span>
                                }
                            </div>
                            <p className='text-s1_2 flex flex-col'>
                                Bem vindo, <span className='text-s1_5 text-color_primary'>{formatTextLong(user.name, 18)}</span>
                            </p>
                        </div>
                    </Link>
                    {IsLogged ?
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
                            <Link className="text-s1_3 text-color_primary my-2" to={'/login'}>
                                <Button customClass={"btn-primary mt-4 px-8"}>Faça seu login</Button>
                            </Link>
                            <span>ou</span>
                            <Link className="text-s1_3 text-color_primary my-2" to={'/register'}>
                                <p className='cursor-pointer text-color_second font-bold'>Registre-se</p>
                            </Link>
                        </>}
                </>
            }
        </div>
    )
}
