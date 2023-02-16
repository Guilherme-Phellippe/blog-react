import { useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking }) => {

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