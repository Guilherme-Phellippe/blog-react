import OneSignal from 'react-onesignal';
import { dialog } from '../modals/Dialog';

export const initOneSignal = async () => {
  await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" })

  const userDevice = await OneSignal.getUserId();
  if (userDevice) {
    if (Notification.permission === "default") Notification.requestPermission()
    else if (Notification.permission === "denied") {
      const resp = await dialog('Suas notificações estão bloqueadas 😱 \nVocê não está recebendo nossas receitas quentinhas assim que publicadas! \n\nCorrija agora mesmo nas configurações do seu navegador.', 0, "Corrigir agora");
      if (resp) {
        const userAgent = navigator.userAgent.toLowerCase();
        const browsers = ["chrome", "firefox", "safari","edge"];
        const userBrowser = browsers.find(browser => userAgent.includes(browser))
        console.log(userBrowser)
        dialog("Clique no botão abaixo para redefinir suas notificações: <br/><br/><br/> <a href='https://www.google.com' target='_blank'>Google</a>", 1)
      }
    }
  }



}
