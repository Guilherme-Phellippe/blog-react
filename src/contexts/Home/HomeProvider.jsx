import { createContext, useMemo, useState } from "react"

export const HomeContext = createContext();

export const HomeProvider =({ children }) => {
    const [valueSearch, setValueSearch] = useState();

    const valuesSearchStates = useMemo(()=> ({ valueSearch, setValueSearch }), [valueSearch] )

    return (
        <HomeContext.Provider value={valuesSearchStates}>
            {children}
        </HomeContext.Provider>
    )
}


