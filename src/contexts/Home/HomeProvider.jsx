import { createContext, useState } from "react"

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState();

    return (
        <HomeContext.Provider value={{ valueSearch, setValueSearch }}>
            {children}
        </HomeContext.Provider>
    )

}


