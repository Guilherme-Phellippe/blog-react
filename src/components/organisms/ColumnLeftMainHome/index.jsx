import moment from "moment";
import { useCallback, useMemo } from "react"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnLeftMainHome = ({ recipes }) => {

    
    const MostRecent = useCallback(() => {
        return [...recipes].sort((a, b) => {
            let date1 = moment(a.createdAt).dayOfYear()
            let date2 = moment(b.createdAt).dayOfYear()
            return (date2 - date1)
        })
    }, [recipes]);

    return (
        <aside className="hidden md:block col-span-1">
            {useMemo(() => {
                return <BoxRankingRecipes 
                    title={'Receitas novas'} 
                    ranking={MostRecent()} />
            }, [MostRecent])}
        </aside>
    )
}