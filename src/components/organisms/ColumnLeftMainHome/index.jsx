import moment from "moment";
import { useCallback, useMemo } from "react"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnLeftMainHome = ({ recipes }) => {


    const MostRecent = useCallback(() => {
        return [...recipes].sort((a, b) => {
            let date1 = moment(a.createdAt, 'YYYY-MM-DD HH:mm:ss')
            let date2 = moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss')
            if (date1.isAfter(date2)) return -1
            else if (date1.isBefore(date2)) return 1
            else return 0
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