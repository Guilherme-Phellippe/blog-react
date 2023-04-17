import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { FcGoogle } from "react-icons/fc"

import { Button } from "../../atoms/Button"
import { useNotificationApi, useUserApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { MdFacebook } from 'react-icons/md';

const firebaseConfig = {
    apiKey: "AIzaSyDkpJkYLEFE3r-oyqpdG_4uGJEo9IDYAo8",
    authDomain: "tem-sabor-auth.firebaseapp.com",
    projectId: "tem-sabor-auth",
    storageBucket: "tem-sabor-auth.appspot.com",
    messagingSenderId: "452576142508",
    appId: "1:452576142508:web:144b4553e640ed2f68ab09"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();

export const LoginWithSocialMidia = () => {
    const notificationApi = useNotificationApi()
    const userApi = useUserApi();
    const navigate = useNavigate();


    const handleGoogleLogin = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
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
                    console.log(response)
                    notificationApi.newNotificationAlreadyExist("e7682967-ea1e-4b46-8d2c-d1621dac5dd1", response.id)
                    localStorage.setItem('token', JSON.stringify(response))
                    navigate('/')
                } else {
                    const { data } = await userApi.authenticateUser(
                        {
                            email: userData.email.toLowerCase(),
                            password: userData.displayName.split(' ').join('')
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
            });
    }

    const handleFacebookLogin = async () => {
        signInWithPopup(auth, providerFb)
            .then(async (result) => {
               console.log(result)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    return (
        <>
            <Button event={handleGoogleLogin} customClass='border rounded-3xl flex items-center gap-3 text-s1_5 px-8 py-4'>
                <FcGoogle />
                Entrar com google
            </Button>
            <Button event={handleFacebookLogin} customClass='border rounded-3xl flex items-center gap-3 text-s1_5 px-8 py-4'>
                <MdFacebook className='fill-blue-700' />
                Entrar com Facebook
            </Button>
        </>
    )
}