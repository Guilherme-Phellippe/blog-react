import { createContext, useEffect, useMemo, useRef, useState } from "react"
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

    const homeContextValue = useMemo(() => ({
        valueSearch,
        user,
        children
    }), [valueSearch, user, children])

    return (
        <HomeContext.Provider value={{homeContextValue, setValueSearch}}>
            {console.log("HomeProvider")}
            {children}
        </HomeContext.Provider>
    )
}


