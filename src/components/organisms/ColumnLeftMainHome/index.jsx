import { useMemo } from "react"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnLeftMainHome = ({ ranking }) => {
    return (
        <aside>
            {useMemo(() => {
                return <BoxRankingRecipes title={'Receitas novas'} ranking={ranking} />
            }, [ranking])}
        </aside>
    )
}