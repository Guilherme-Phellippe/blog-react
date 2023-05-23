import { createContext, useEffect, useRef, useState } from "react"
import { useUserApi } from "../../hooks/useApi";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState('');
    const refUserApi = useRef(useUserApi())
    const [user, setUser] = useState();

    useEffect(() =>{
        (async ()=>{
            const response = await refUserApi.current.authenticateLogin();
            console.log(response)
            if(response) setUser(response.data)
        })()
    },[])

    return (
        <HomeContext.Provider value={{ valueSearch, setValueSearch, user }}>
            {children}
        </HomeContext.Provider>
    )
}