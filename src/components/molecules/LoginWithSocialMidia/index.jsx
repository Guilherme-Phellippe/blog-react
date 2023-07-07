import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { useNotificationApi, useUserApi } from '../../../hooks/useApi';
import { dialog } from '../../../modals/Dialog'
import { formatTextLong } from '../../../scripts/formatTextLong'

import { FcGoogle } from "react-icons/fc"
import { MdExitToApp, MdFacebook } from 'react-icons/md';

import { Button } from "../../atoms/Button"
import { Img } from '../../atoms/Img'
import { Loading } from '../../atoms/Loading/Loading';

const firebaseConfig = {
    apiKey: "AIzaSyDkpJkYLEFE3r-oyqpdG_4uGJEo9IDYAo8",
    authDomain: "tem-sabor-auth.firebaseapp.com",
    projectId: "tem-sabor-auth",
    storageBucket: "tem-sabor-auth.appspot.com",
    messagingSenderId: "452576142508",
    appId: "1:452576142508:web:144b4553e640ed2f68ab09"
};


const app = initializeApp(firebaseConfig);
const authLogin = getAuth(app)
const provider = new GoogleAuthProvider();

export const LoginWithSocialMidia = () => {
    const [connected, setConnected] = useState({ connected: false })
    const [loading, setLoading] = useState(false);
    const notificationApi = useNotificationApi()
    const userApi = useUserApi();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        signInWithPopup(authLogin, provider)
            .then(async (result) => {
                setLoading(true)
                const userData = result.user.providerData[0];

                const user = {
                    id: userData.uid,
                    name: userData.displayName,
                    email: userData.email,
                    photo: userData.photoURL,
                    password: userData.displayName.split(' ').join(''),
                }

                const response = await userApi.createNewUser(user);
                if (!response.error) {
                    notificationApi.newNotificationAlreadyExist("e7682967-ea1e-4b46-8d2c-d1621dac5dd1", response.id)
                    localStorage.setItem('token', JSON.stringify(response))
                    navigate('/')
                } else {
                    const { data } = await userApi.authenticateUser(
                        {
                            email: userData.email.toLowerCase(),
                            socialLogin: true
                        }
                    );

                    if (data) {
                        localStorage.setItem("token", JSON.stringify(data));
                        navigate('/')
                    } else alert("Usuario ou senha incorretos!")
                }
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            });
    }

    const handleFacebookLogin = () => {
        window.FB.login((resp) => {
            const { accessToken } = resp.authResponse
            localStorage.setItem("f-access-t_34353839", JSON.stringify({ token: accessToken }))

            window.FB.api('/me', { fields: 'name, email, picture' }, async (userData) => {
                const { name, picture, email, id } = userData

                if (resp.status === "connected") {
                    const user = {
                        id,
                        name,
                        email,
                        photo: picture.data.url,
                    }

                    const response = await userApi.createNewUser(user);

                    if (!response.error) {
                        notificationApi.newNotificationAlreadyExist("e7682967-ea1e-4b46-8d2c-d1621dac5dd1", response.id);
                        localStorage.setItem('token', JSON.stringify(response))
                        navigate('/')
                    } else {
                        const { data } = await userApi.authenticateUser(
                            {
                                email: userData.email.toLowerCase(),
                                socialLogin: true
                            }
                        );

                        if (data) {
                            localStorage.setItem("token", JSON.stringify(data));
                            navigate('/')
                        } else dialog("Alguma coisa não se saiu bem :(, tente novamente mais tarde", 0)
                    }
                }
            })
        }, { scope: 'public_profile, email' });
    };

    const handleLogoutFacebook = () => {
        window.FB.logout(() => {
            setConnected({ connected: false })
        });
    }

    useEffect(() => {
        window.FB?.getLoginStatus(function (response) {
            window.FB?.api('/me', { fields: 'name, email, picture' }, async (userData) => {
                const { name, picture: { data: { url } } } = userData
                name ? setConnected({ connected: true, name, photo: url }) : setConnected({ connected: false })
            })
        });

        window.fbAsyncInit = () => {
            window.FB.init({
                appId: 593957432708717,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v16.0'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, [])

    return (
        <div className='w-full flex flex-col justify-center items-center relative' id='tested'>
            <Button event={handleGoogleLogin} customClass='w-full max-w-[300px] h-[40px] flex border rounded-3xl flex items-center gap-3 text-s1_5 py-4 my-8 bg-green-600'>
                <FcGoogle className='text-s2_5 w-[55px] h-[50px] border border-green-500 rounded-full bg-white -translate-x-2' />
                <span className='border-l px-4 w-full text-center text-white font-bold'>
                    Entrar com google
                </span>
            </Button>

            {
                connected.connected ?
                    <div className="flex flex-col items-center w-full max-w-[500px] border p-4 rounded-xl">
                        <Button event={handleFacebookLogin} customClass='w-full max-w-[300px] h-[40px] flex border rounded-3xl flex items-center gap-3 py-4 bg-blue-600'>
                            <MdFacebook className='text-s2_5 w-[55px] h-[50px] border border-blue-700 rounded-full bg-white fill-blue-700 -translate-x-2' />
                            <div className="w-4/6 flex flex-col items-start border-l">
                                <span className=' w-full text-s1_1 text-white'>Continuar como</span>
                                <span className=' w-full text-s1_3 text-white font-bold'>
                                    {`${formatTextLong(connected.name, 18)}`}
                                </span>
                            </div>
                            <div className="w-[40px] m-4 rounded-full overflow-hidden">
                                <Img imgs={connected.photo} alt={"foto de " + connected.name} />
                            </div>
                        </Button>

                        <Button event={handleLogoutFacebook} customClass='w-full max-w-[250px] h-[40px] mx-auto mt-8 flex rounded-3xl flex items-center py-4 bg-blue-600'>
                            <MdExitToApp className='w-[40px] h-[40px] p-2 border border-red-700 rounded-full bg-white fill-red-700 -translate-x-2' />
                            <span className='w-5/6 text-s1_1 text-white font-bold'>
                                Desconectar do facebook
                            </span>
                        </Button>
                    </div>
                    :
                    <Button event={handleFacebookLogin} customClass='w-full max-w-[300px] h-[40px] flex border rounded-3xl flex items-center gap-3 py-4 bg-blue-600'>
                        <MdFacebook className='text-s2_5 w-[55px] h-[50px] border border-blue-700 rounded-full bg-white fill-blue-700 -translate-x-2' />
                        <span className='w-full text-s1_3 text-white font-bold border-l'>
                            Entrar com facebook
                        </span>
                    </Button>

            }
            <span className='w-5/6 max-w-[300px] text-s1_2 text-center my-8'>
                Ao criar a conta nas redes Google e Facebook, você aceita nossas
                <a
                    href="/policy"
                    className='text-blue-900 hover:text-blue-500 cursor-pointer'
                    target='_blank'
                > Políticas Privacidade </a>
                e nossos
                <a
                    href="/terms"
                    className='text-blue-900 hover:text-blue-500 cursor-pointer'
                    target='_blank'
                > Termos de uso </a>.
            </span>

            {loading && <Loading />}
        </div>
    )
}