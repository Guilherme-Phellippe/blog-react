import moment from "moment";
import { useCallback, useEffect, useMemo } from "react"
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

    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            window.innerWidth > 700 &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])


    return (
        <aside className="hidden md:block col-span-1">
            {useMemo(() => {
                return <BoxRankingRecipes
                    title={'Receitas novas'}
                    ranking={MostRecent()} />
            }, [MostRecent])}

            {
                window.innerWidth > 700 &&
                <ins class="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="6974841302"
                    data-matched-content-ui-type="image_sidebyside"
                    data-matched-content-rows-num="4"
                    data-matched-content-columns-num="1"
                    data-ad-format="autorelaxed"
                ></ins>
            }

        </aside>
    )
}