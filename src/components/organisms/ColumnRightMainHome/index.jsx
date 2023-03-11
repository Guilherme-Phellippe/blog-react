import { useMemo } from "react"
import { PanelUser } from "../../organisms/PanelUser/PanelUser"
import { BoxRankingRecipes } from "../BoxRankingRecipes"

export const ColumnRightMainHome = ({ ranking, user}) => {

    return (
        <aside>
            {useMemo(() => {
                return (
                    <>
                        <PanelUser 
                            name_user={user ? user.name : 'Usuário'}
                            photo={user?.photo}    
                        />
                        <BoxRankingRecipes title={'As mais amadas'} ranking={ranking} />
                    </>
                )
            }, [ranking, user])}
        </aside>
    )
}