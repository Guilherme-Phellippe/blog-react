import OneSignal from 'react-onesignal';

export const initOneSignal = async () => {
    window.OneSignal = window.OneSignal || [];

    await OneSignal.init(
        {
            appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c",
            allowLocalhostAsSecureOrigin: true
        });
}