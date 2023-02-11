import { useMemo } from "react"
import { PanelUser } from "../../templates/Home/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking }) => {
    console.log(ranking);

    return (
        <aside>
            {useMemo(() => {
                return (
                    <>
                        <PanelUser />
                        <BoxRankingRecipes title={'As mais amadas'} ranking={ranking} />
                    </>
                )
            }, [ranking])}
        </aside>
    )
}