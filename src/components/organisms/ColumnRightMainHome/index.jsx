import { useCallback, useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

import moment from "moment"

export default function ColumnRightMainHome({ ranking = [] }) {
    const MostRecent = useCallback(() => {
        return [...ranking].sort((a, b) => {
            let date1 = moment(a.createdAt, 'YYYY-MM-DD HH:mm:ss')
            let date2 = moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss')
            if (date1.isAfter(date2)) return -1
            else if (date1.isBefore(date2)) return 1
            else return 0
        })
    }, [ranking])


    return (
        <aside className={`col-span-1 bg-white md:block`}>
            {useMemo(() => {
                return (!!ranking.length ?
                    <>
                        <PanelUser />
                        <BoxRankingRecipes title={'As mais amadas'} ranking={ranking} />
                        {window.innerWidth > 700 ?
                            <ins className="adsbygoogle"
                                style={{ display: "block" }}
                                data-ad-client="ca-pub-4781060024956035"
                                data-ad-slot="6974841302"
                                data-matched-content-ui-type="image_sidebyside"
                                data-matched-content-rows-num="4"
                                data-matched-content-columns-num="1"
                                data-ad-format="autorelaxed"
                            ></ins>
                            :
                            null
                        }

                        {/* This categories list will only be displayed, if user is in resolution lower than 768px */}
                        <div className="flex flex-col md:hidden">
                            {/* orange horizontal line to mark division between categories */}
                            <p className="bg-color_orange w-full h-[2px] my-12"></p>
                            <BoxRankingRecipes title={'Receitas novas'} ranking={MostRecent()} />
                        </div>
                    </>
                    :
                    <h2 className="text-s1_5 text-center p-10 text-color_text_black_light">
                        Não é permitido a exibição das listas de receitas no seu painel do usuario,
                        por favor retorne a home para ter acesso as receitas rankeadas.
                    </h2>
                )
            }, [ranking, MostRecent])}
        </aside>
    )
}