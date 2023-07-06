import OneSignal from 'react-onesignal';
import { dialog } from '../modals/Dialog';

export const initOneSignal = async () => {
  await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" })

  const userDevice = await OneSignal.getUserId();
  if (userDevice) {
    if (Notification.permission === "default") Notification.requestPermission((res) => console.log(res))
    else if (Notification.permission === "denied") {
      const resp = dialog('Suas notificações estão bloqueadas 😱 \nVocê não está recebendo nossas receitas quentinhas assim que publicadas! \nCorrija agora mesmo nas configurações do seu navegador.');
      resp && window.open('chrome://settings/content/notifications')
    }
  }



}
