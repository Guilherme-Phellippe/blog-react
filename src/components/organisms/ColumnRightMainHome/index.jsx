import { useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking, user, isOpenRanking }) => {

    return (
        <aside className={`col-span-1 md:block ${isOpenRanking ? "block" : "hidden"}`}>
            {useMemo(() => {
                return (
                    <>
                        <PanelUser />

                        <BoxRankingRecipes title={'As mais amadas'} ranking={ranking} />
                        {
                            isOpenRanking &&
                            <>
                                <p className="bg-color_orange w-full h-[2px] my-12"></p>
                                <BoxRankingRecipes title={'Receitas novas'} ranking={ranking} />
                            </>
                        }
                    </>
                )
            }, [ranking, isOpenRanking])}
        </aside>
    )
}