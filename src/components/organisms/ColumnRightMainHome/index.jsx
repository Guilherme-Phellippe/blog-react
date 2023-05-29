import moment from "moment"
import { useCallback, useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking, isOpenRanking }) => {

    const MostRecent = useCallback(() => {
        return [...ranking].sort((a, b) => {
            let date1 = moment(a.createdAt, 'YYYY-MM-DD HH:mm:ss')
            let date2 = moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss')
            if (date1.isAfter(date2)) return -1
            else if (date1.isBefore(date2)) return 1
            else return 0
        })
    }, [ranking])

    // useEffect(() => {
    //     // GOOGLE ADSENSE 
    //     window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    // }, [])

    return (
        <aside className={`col-span-1 md:block ${isOpenRanking ? "block" : "hidden"}`}>
            {useMemo(() => {
                return (
                    <>
                        <PanelUser />

                        <BoxRankingRecipes title={'As mais amadas'} ranking={ranking} />

                        {/* <ins class="adsbygoogle"
                            style={{ display: "block" }}
                            data-ad-client="ca-pub-4781060024956035"
                            data-ad-slot="6974841302"
                            data-matched-content-ui-type="image_sidebyside"
                            data-matched-content-rows-num="4"
                            data-matched-content-columns-num="1"
                            data-ad-format="autorelaxed"
                        ></ins> */}

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