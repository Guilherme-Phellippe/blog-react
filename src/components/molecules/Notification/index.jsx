
import { useState } from "react"
import { MdArrowDropDown, MdArrowDropUp, MdDelete, MdMessage } from "react-icons/md"
import { useNotificationApi } from "../../../hooks/useApi";
import { formatTextLong } from "../../../scripts/formatTextLong";

import moment from "moment"

export const Notification = ({ notification, setNotifications }) => {
    const notificationApi = useNotificationApi()
    const [showMessage, setShowMessage] = useState(false)
    const [read, setRead] = useState(notification.read)

    const handleOpenMessage = async () => {
        setShowMessage(msg => !msg)
        
        if (!read) {
            const { notificationId, userId } = notification
            const response = await notificationApi.updateReadNotification(notificationId, userId)
            if (response.status === 200) {
                notification.read = true
                setRead(true)
            }
        }
    }

    const handleDeleteNotification = async ({ currentTarget }) => {
        //eslint-disable-next-line
        const canDelete = confirm("Deseja realmente excluir essa notificação?");

        if (canDelete) {
            const { notificationId, userId } = notification
            const response = await notificationApi.deleteNotification(notificationId, userId).catch(error => console.error(error));
            if (response.status === 200) setNotifications(notifications => notifications.filter(not => not.notificationId !== currentTarget.id ));
        }
    }

    return (
        <div className={`w-full flex-col border-[1px] ${read ? "border-color_sub_text" : "border-color_red"}`}>
            <div className={`w-full h-36 border-[1px] flex justify-evenly items-center cursor-pointer`}>
                <div className="w-1/12 md:w-1/5 grid place-items-center border-r-[1px]">
                    <MdMessage className={`text-s2_5 ${read ? "text-color_sub_text" : "text-color_red"}`} />
                </div>
                <div onClick={handleOpenMessage} className="w-3/5 flex justify-between">
                    <p className={`text-s1_5 ${!read && 'text-color_orange'}`}>{formatTextLong(notification.notification.title, 30)}</p>
                    {showMessage ? <MdArrowDropUp className="text-s2_5" /> : <MdArrowDropDown className="text-s2_5" />}
                </div>
                <div className="w-1/6 flex justify-center">
                    <p
                        id={notification.notificationId}
                        onClick={handleDeleteNotification}
                        className="flex flex-col justify-center items-center"
                    >
                        <MdDelete className="text-s2 fill-red-700" />Excluir
                    </p>
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


