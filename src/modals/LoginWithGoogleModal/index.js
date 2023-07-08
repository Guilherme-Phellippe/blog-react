import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import app from "../../libs/firebase.config"

const authLogin = getAuth(app)
const provider = new GoogleAuthProvider();

/**
 * 
 * @param {string} text 
 * @param {number} type 
 * @param {string} buttonText 
 * @returns 
 */
export const loginWithGoogleModal = () => {
    const root = document.querySelector("#root")

    const handleGoogleLogin = async () => {
        signInWithPopup(authLogin, provider)
            .then(async (result) => {
                // const userData = result.user.providerData[0];

                // const user = {
                //     id: userData.uid,
                //     name: userData.displayName,
                //     email: userData.email,
                //     photo: userData.photoURL,
                //     password: userData.displayName.split(' ').join(''),
                // }

                // const response = await userApi.createNewUser(user);
                // if (!response.error) {
                //     notificationApi.newNotificationAlreadyExist("e7682967-ea1e-4b46-8d2c-d1621dac5dd1", response.id)
                //     localStorage.setItem('token', JSON.stringify(response))
                //     navigate('/')
                // } else {
                //     const { data } = await userApi.authenticateUser(
                //         {
                //             email: userData.email.toLowerCase(),
                //             socialLogin: true
                //         }
                //     );

                //     if (data) {
                //         localStorage.setItem("token", JSON.stringify(data));
                //         navigate('/')
                //     } else alert("Usuario ou senha incorretos!")
                // }
            })
            .catch((error) => {
                console.error(error)
            });
    }


    return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        container.setAttribute("class", "fixed bottom-0 left-0 z-[999] w-screen h-screen flex items-end");

        const box = document.createElement('div');
        box.setAttribute('class', `flex flex-col w-screen min-h-[20rem] bg-white shadow-xl p-2 rounded-t-xl translate-y-full transition-all durantion-1000`)
        setTimeout(() => box.classList.add("translate-y-[0px]"), 500);

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex p-4");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "")

        const title = document.createElement("h2");
        title.setAttribute("class", `w-4/5 text-color_text_black font-bold text-center text-s1_5 rounded-t-xl`)
        title.innerText = "Faça login com o google"

        const closeButton = document.createElement("span")
        closeButton.setAttribute("class", `w-1/5 text-color_text_black text-center text-s1_5 rounded-t-xl`)
        closeButton.innerText = "X"

        const buttonGoogle = document.createElement("button")
        buttonGoogle.setAttribute("class", `w-full max-w-[300px] h-[40px] border rounded-3xl flex items-center gap-3 text-s1_5 py-4 my-8 bg-green-600`)
        buttonGoogle.innerText = "Entrar com o Google"
        buttonGoogle.addEventListener("click", handleGoogleLogin)

        contentTop.appendChild(title)
        contentTop.appendChild(closeButton)
        box.appendChild(contentTop)
        contentBottom.appendChild(buttonGoogle)
        box.appendChild(contentBottom)
        container.appendChild(box)


        root.appendChild(container)
    })
}