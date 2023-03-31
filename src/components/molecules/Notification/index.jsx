
import moment from "moment";
import { useState } from "react"
import { MdArrowDropDown, MdArrowDropUp, MdCheckBox, MdDelete, MdMessage } from "react-icons/md"
import { useNotificationApi } from "../../../hooks/useApi";
import { formatTextLong } from "../../../scripts/formatTextLong";

export const Notification = ({ notification }) => {
    const notificationApi = useNotificationApi()
    const [showMessage, setShowMessage] = useState(false)
    const [read, setRead] = useState(notification.read)

    const handleReadMessage = async () => {
        if(!read){
            const { notificationId, userId } = notification
            const response = await notificationApi.updateReadNotification(notificationId, userId)
            if(response.status === 200){
                notification.read = true
                setRead(true)
            }
        }
    }

    return (
        <div className={`w-full flex-col border-[1px] ${read ? "border-color_sub_text" : "border-color_second"}`}>
            <div className={`w-full h-36 border-[1px] flex justify-evenly items-center cursor-pointer`}>
                <div className="w-1/5 grid place-items-center border-r-[1px]">
                    <MdMessage className={`text-s2_5 ${read ? "text-color_sub_text" : "text-color_second"}`} />
                </div>
                <div onClick={() => setShowMessage(msg => !msg)} className="w-3/5 flex justify-between">
                    <p className={`text-s1_5 ${!read && 'text-color_primary'}`}>{formatTextLong(notification.notification.title, 30)}</p>
                    {showMessage ? <MdArrowDropUp className="text-s2_5" /> : <MdArrowDropDown className="text-s2_5" />}
                </div>
                <div className="w-1/5 flex justify-center gap-8">
                    <p
                        onClick={handleReadMessage}
                        className="flex flex-col justify-center items-center"
                    >
                        <MdCheckBox className={`text-s2  ${read ? "fill-green-800" : "fill-color_sub_text"}`} /> Marcar como lida
                    </p>
                    <p className="flex flex-col justify-center items-center"><MdDelete className="text-s2 fill-red-700" />Excluir </p>
                </div>
            </div>
            {showMessage &&
                <div className="w-full flex flex-col p-8">
                    <p
                        className="flex flex-col items-center text-s1_3 text-center px-8]"
                        dangerouslySetInnerHTML={{ __html: notification.notification.message }}
                    ></p>
                    <div className="flex justify-between mt-8 pt-6 px-4 border-t-[1px] text-s1 opacity-70">
                        <span>@EquipeTemSabor</span>
                        <span>{moment(notification.createdAt).format('lll')}</span>
                    </div>
                </div>
            }
        </div>
    )
}


