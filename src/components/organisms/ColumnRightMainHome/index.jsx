import moment from "moment"
import { useCallback, useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking, isOpenRanking }) => {

    const MostRecent = useCallback(() => {
        return [...ranking].sort((a, b) => {
            let date1 = moment(a.createdAt, 'YYYY-MM-DD HH:mm:ss')
            let date2 = moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss')
            if(date1.isAfter(date2)) return -1
            else if (date1.isBefore(date2)) return 1
            else return 0
        })
    }, [ranking])

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
                                <BoxRankingRecipes title={'Receitas novas'} ranking={MostRecent()} />
                            </>
                        }
                    </>
                )
            }, [ranking, isOpenRanking, MostRecent])}
        </aside>
    )
}