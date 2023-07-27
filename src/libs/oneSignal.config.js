import OneSignal from 'react-onesignal';
import { dialog } from '../modals/Dialog';

export const initOneSignal = async () => {
  window.addEventListener("load", async ()=>{
    await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" })
    console.log("Script executado depois de carregar a página", new Date().getMilliseconds())
    const userDevice = await OneSignal.getUserId();
    if (userDevice) {
      if (Notification.permission === "default") Notification.requestPermission()
      else if (Notification.permission === "denied") {
        const resp = await dialog('Suas notificações estão bloqueadas 😱 \nVocê não está recebendo nossas receitas quentinhas assim que são publicadas! \n\nCorrija agora mesmo nas configurações do seu navegador.', 0, "Corrigir agora");
        if (resp) {
          const isMobile = window.innerWidth <= 764;
          const text = isMobile ? 
          "Navegue até as configurações do seu navegador, procure por configurações do site ou algo parecido, \nache o nome do nosso site e permita as notificações!"
          :
          "Clique no cadeado ou algo parecido, que fica ao lado do nome 'temsabor.blog',\nprocure por notificações, veja se está desabilitado, se estiver, permita as notificações."
          dialog(`${text}\n\nProntinho! agora você já deve começar a receber nossas notificações!`, 1)
        }
  
      }
    }
  })
}
