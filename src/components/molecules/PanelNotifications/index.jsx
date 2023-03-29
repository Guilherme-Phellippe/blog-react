import { Notification } from "../Notification"

export const PanelNotifications = ({ notifications }) => {

    return (
        <div className="flex flex-col gap-y-4 w-full h-full overflow-auto">
            {notifications.map(notification => <Notification notification={notification} />)}
        </div>
    )
}