import { createContext, useEffect, useRef, useState } from "react"
import { useUserApi } from "../../hooks/useApi";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState('');
    const [user, setUser] = useState();
    const refUserApi = useRef(useUserApi())

    useEffect(() => {
        (async () => {
            const response = await refUserApi.current.authenticateLogin();
            response?.data ? setUser(response.data) : localStorage.removeItem('token');
        })()
    }, [])

    return (
        <HomeContext.Provider value={{valueSearch, user, setValueSearch}}>
            {children}
        </HomeContext.Provider>
    )
}


