import OneSignal from 'react-onesignal';

export const initOneSignal = async () => {
    await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" });
    const subscription = await OneSignal.getSubscription();
    const externalUserId = await OneSignal.getExternalUserId();
    const userId = await OneSignal.getUserId();
    const tags = await OneSignal.getTags();
    const isPushNotificationsEnabled = await OneSignal.isPushNotificationsEnabled();
    const provideUserConsent = await OneSignal.provideUserConsent()

    console.log("subscription: ", subscription)
    console.log("externalUserId: ", externalUserId)
    console.log("userId: ", userId)
    console.log("tags: ", tags)
    console.log("isPushNotificationsEnabled: ", isPushNotificationsEnabled)
    console.log("provideUserConsent: ", provideUserConsent)

    Notification.requestPermission();
}
