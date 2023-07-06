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
        console.log(userAgent)
        switch (userAgent) {
          case userAgent.includes('chrome'): {
            window.location.href = 'chrome://settings/content/notifications';
            break;
          }
          case userAgent.includes('firefox'): {
            window.location.href = 'about:preferences#privacy';
            break;
          }
          case userAgent.includes('safari'): {
            //eslint-disable-next-line
            window.location.href = 'javascript:window.open(\'/path/to/instructions/safari.html\')';
            break;
          }
          case userAgent.includes('edge'): {
            window.location.href = 'edge://settings/content/notifications';
            break;
          } 
          default: {
            await dialog("Não foi possivel detectar seu navegador! \n\nMas você pode acessar as configurações de notificações dele e permitir a Tem sabor enviar receitas direto para você!")
          }
        }
      }
    }
  }



}
