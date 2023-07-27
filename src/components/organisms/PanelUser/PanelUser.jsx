import { Link } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';

import { formatTextLong } from '../../../scripts/formatTextLong'

import { Button } from '../../atoms/Button'
import { Img } from '../../atoms/Img';
import { UserContext } from '../../../contexts/userProvider';


export const PanelUser = () => {
    const { user } = useContext(UserContext)
    const numberNotifications = useRef(0)


    useEffect(() => {
        if (user) {
            const result = user.notificationUser.reduce((total, current) =>
                total + current.read ? 0 : 1, 0
            );
            numberNotifications.current = result
        }
    }, [user])

    const handleScrollDocument = () =>{
        // need to add this scroll: auto , because on mobile,
        // if the user clicks on the list without closing the sorting modal, scrolling is "hidden"
        document.documentElement.style.overflow = 'auto'
    }


    return (
        <div className="w-full p-6 flex flex-col items-center relative">
            <>
                <Link onClick={handleScrollDocument} to={'/panel-user'}>
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
                {!user &&
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
