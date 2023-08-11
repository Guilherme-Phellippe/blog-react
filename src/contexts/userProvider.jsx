import { createContext, useEffect, useRef, useState } from "react"
import { useUserApi } from "../hooks/useApi";

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState();
    const refUserApi = useRef(useUserApi())
    const loadUser = useRef(false)

    useEffect(() => {
        if(!loadUser.current){
            loadUser.current = true;
            (async () => {
                const response = await refUserApi.current.authenticateLogin();
                setUser(response?.data)
            })();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user }} >
            {children}
        </UserContext.Provider>
    )
}