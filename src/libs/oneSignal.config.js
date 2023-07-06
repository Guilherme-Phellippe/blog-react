import OneSignal from 'react-onesignal';

export const initOneSignal = async () => {
  await OneSignal.init({ appId: "1fc3feb0-617d-4599-b8d8-cd5c995aca0c" })
  
  const userDevice = await OneSignal.getUserId();
  if(userDevice){
    if(Notification.permission !== "granted"){
      Notification.requestPermission((res)=> console.log(res))
    }
  }



}
