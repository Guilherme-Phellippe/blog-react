import OneSignal from 'react-onesignal';

export const initOneSignal = async () => {
    await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" });
    const subscription = await OneSignal.getSubscription();
    const externalUserId = await OneSignal.getExternalUserId();
    const userId = await OneSignal.getUserId();
    const tags = await OneSignal.getTags();

    console.log(subscription)
    console.log(externalUserId)
    console.log(userId)
    console.log(tags)
}
