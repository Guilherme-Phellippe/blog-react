import { useCallback, useMemo } from "react"
import { BoxRankingRecipes } from "../BoxRankingRecipes"
import timer from "../../../scripts/formatTime"

export default function ColumnLeftMainHome({ recipes }) {

    const MostRecent = useCallback(() => {
        return [...recipes].sort((a, b) => {
            let date1 = timer(a.createdAt).diff();
            let date2 = timer(b.createdAt).diff()
            if (date1 > date2) return -1
            else if (date1 < date2) return 1
            else return 0
        })
    }, [recipes]);


    return (
        <aside className="hidden md:block col-span-1 bg-white">
            {useMemo(() => {
                return <BoxRankingRecipes
                    title={'Receitas novas'}
                    ranking={MostRecent()} />
            }, [MostRecent])}

            {
                window.innerWidth > 700 &&
                <ins className="adsbygoogle"
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
