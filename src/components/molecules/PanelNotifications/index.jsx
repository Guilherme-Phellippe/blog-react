import { useState } from "react"
import { Notification } from "../Notification"
import timer from "../../../scripts/formatTime"

export const PanelNotifications = ({ notifications: data }) => {
    const [notifications, setNotifications] = useState(data)
    notifications.sort((a, b) => timer(b.notification.createdAt).diff(a.notification.createdAt))

    return (
        <div className="flex flex-col gap-y-4 w-full h-full overflow-auto">
            <h2 className="text-s2 p-4">Notificações:</h2>
            {
                notifications.length ?
                    notifications.map((notification, key) =>
                        <Notification
                            key={key}
                            notification={notification}
                            setNotifications={setNotifications}
                        />
                    )
                    :
                    <p className="text-s1_5 text-center mt-12">Sua caixa de notificações está limpa :)</p>
            }
        </div>
    )
}