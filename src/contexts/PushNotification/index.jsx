import { createContext } from "react"
import { useNotificationPush } from '../../hooks/useApi';


const subscription = navigator.serviceWorker.register("service-worker.js")
    .then(async serviceWorker => {
        const apiNotificationPush = useNotificationPush();

        let subscription = await serviceWorker.pushManager.getSubscription();

        if (!subscription) {
            const public_key = await apiNotificationPush.getPublicKey();

            subscription = await serviceWorker.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: public_key.data.publicKey
            }).catch(err => console.log("ERROR CREATE SUBSCRIPTION:", err));

        }

        await apiNotificationPush.registerUserWithSubscription(subscription);

        return subscription
    }).catch(error => console.log(error))

export const PushNotificationContext = createContext();


export const PushNotificationProvider = ({ children }) => {
    return (
        <PushNotificationContext.Provider value={{ subscription }}>
            {children}
        </PushNotificationContext.Provider>
    )
}