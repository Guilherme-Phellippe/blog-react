import moment from "moment"
import { Notification } from "../Notification"

export const PanelNotifications = ({ notifications }) => {

    notifications.sort((a,b) => moment(b.notification.createdAt).diff(moment(a.notification.createdAt)))

    return (
        <div className="flex flex-col gap-y-4 w-full h-full overflow-auto">
            {notifications.map((notification, key) => <Notification key={key} notification={notification} />)}
        </div>
    )
}