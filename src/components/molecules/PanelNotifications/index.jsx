import moment from "moment"
import { useState } from "react"
import { Notification } from "../Notification"

export const PanelNotifications = ({ notifications: data }) => {
    const [notifications, setNotifications] = useState(data)
    notifications.sort((a, b) => moment(b.notification.createdAt).diff(moment(a.notification.createdAt)))

    return (
        <div className="flex flex-col gap-y-4 w-full h-full overflow-auto">
            {
                notifications.length ?
                notifications.map((notification, key) => <Notification key={key} notification={notification} setNotifications={setNotifications} />)
                :
                <p className="text-s1_5 text-center mt-12">Sua caixa de notificações está limpa :)</p>
            }
        </div>
    )
}