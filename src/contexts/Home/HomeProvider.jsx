import { createContext, useState } from "react"

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => { 
    const [valueSearch , setValueSearch] = useState('');
    const [user, setUser ] = useState();

    return(
        <HomeContext.Provider value={{valueSearch, setValueSearch, user, setUser}}>
            {children}
        </HomeContext.Provider>
    )
}