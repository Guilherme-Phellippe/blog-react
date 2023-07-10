import { useEffect, useRef, useState } from "react"
import { LoginWithSocialMidia } from "../../components/molecules/LoginWithSocialMidia"
import { Img } from "../../components/atoms/Img";
import { captureEmailAndPhoneNumber } from "../CaptureEmailAndPhoneNumber";
import { dialog } from "../Dialog";
import { useNotificationPush } from "../../hooks/useApi";

export default function LoginWithSocialMidiaModal() {
    const notificationApi = useNotificationPush();
    const containerRef = useRef(null)
    const [showContainer, setShowContainer] = useState(false);

    useEffect(() => {
        const userLogged = localStorage.getItem("token")

        !userLogged && setShowContainer(true)
    }, [])

    const closeModal = ({ target }) => {
        if (target.dataset.ref) {
            containerRef.current.classList.add("hidden")
            handleDisplayCaptureEmailAndNumber()
        }
    }

    /**
     * this function handles triggering the modal that aims to 
     * capture the user's email or cell phone number.
     */
    const handleDisplayCaptureEmailAndNumber = () => {
        //This setTimeout is to wait for the user to browse the app a little and 
        //then open the modal if necessary
        setTimeout(async () => {
            // In this line we get the datapush which is an object and initialize it in the dataPush variable,
            // if it doesnt exist, we start dataPush with the already made object.
            const dataPush = JSON.parse(localStorage.getItem("datapush")) || { howmanytimes: 1, email: false, cell_phone: false }
            
            //In this line, we take the value of howManyTimes and divide it by 3,
            //so we will have every 3 numbers false, 
            //because we want the rest of the division to be different from 0.
            const tryEmailOrPhone = Number(dataPush.howmanytimes) % 3 !== 0

            //In this line, we check if the rest of the division is false or true,
            //if it is true we open an email modal, if it is false we open a phone number modal, 
            //we also check if we have already captured the email or cell phone number
            var response = null;
            if (tryEmailOrPhone && !dataPush.email) response = await captureEmailAndPhoneNumber(true);
            if (!tryEmailOrPhone && !dataPush.cell_phone) response = await captureEmailAndPhoneNumber(false);
            
            //In this line we add 1 more number to the count, 
            //to verify how many times we have already displayed the modal to the user.
            dataPush.howmanytimes += 1;

            //In this line, if the user left the email or cell phone number, 
            //we leave it marked with true that the user left his data.
            response && tryEmailOrPhone ? dataPush.email = true : dataPush.cell_phone = true

            //In this line we are going to save in localstorage what we get from the user,
            //be it an email, cell number or nothing
            localStorage.setItem("datapush", JSON.stringify(dataPush));

            if (response) {
                //if the user left his data, 
                //let's save it in the database with the createDataPush function, sending the data to it.
                await notificationApi.createDataPush(dataPush)
                await dialog(`${tryEmailOrPhone ? "E-mail" : "Número de telefone"} cadastrado com sucesso !`, 2)
            }
        }, 15000);
    }

    return (
        showContainer &&
        <div
            ref={containerRef}
            onClick={closeModal}
            data-ref={"container"}
            className=" w-screen h-screen z-[999] bg-black/30 fixed top-0 left-0 flex items-end md:items-start md:justify-end"
        >
            <div className="w-full md:w-[500px] md:min-h-[350px] md:mt-32 md:mr-8 md:py-8 h-[30rem] rounded-t-xl md:rounded-xl bg-white p-4">
                <div className="w-full gap-4 flex justify-center items-center border-b-[1px] border-b-black/20 relative">
                    <span
                        data-ref={"container"}
                        className="absolute top-0 right-0 text-s1_7 font-bold font-sans cursor-pointer"
                    >X</span>
                    <div className="flex justify-center items-center">
                        <div className="w-4/5 flex justify-start">
                            <h2 className="text-s1_7 text-left text-color_text_black">Faça login<br />de forma rápida e fácil,<br />basta escolher sua rede social.</h2>
                        </div>
                        <div className="w-[100px]">
                            <Img
                                imgs={"https://i.ibb.co/q7QYwwk/Online-world-cuate-2-removebg-preview.png"}
                                alt={"Imagem com varias pessoas se conectando via rede social"}
                            />
                        </div>
                    </div>
                </div>
                <LoginWithSocialMidia redirect={window.location.pathname} />
            </div>
        </div>
    )
}