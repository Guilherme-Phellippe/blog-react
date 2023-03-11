export async function checkUserLogged(api) {

    const infoToken = JSON.parse(localStorage.getItem('token'))
    
    if(infoToken){
        if(!infoToken.token) throw new Error("token is missing")
        if(!infoToken.id) throw new Error("Id is missing")
    
        const user = await api.authenticateLogin(infoToken)
        return user
    }


    return []    
}