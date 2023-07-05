import OneSignal from 'react-onesignal';

export const initOneSignal = async () => {
    await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" });


    try {
        const response = await fetch('https://onesignal.com/api/v1/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.ONESIGNAL_TOKEN}`,
          },
          body: JSON.stringify({
            app_id: `${process.env.APP_ID}`,
            contents: { en: 'Conteúdo da notificação em inglês', pt: 'Conteúdo da notificação em português' },
            headings: { en: 'Título da notificação em inglês', pt: 'Título da notificação em português' },
            /* Outras opções de personalização da notificação */
          }),
        });
    
        const responseData = await response.json();
        console.log('Notificação enviada:', responseData);
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
      }

}
