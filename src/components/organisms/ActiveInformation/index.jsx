import { PanelListRecipes } from "../../molecules/PanelListRecipes"
import { PanelMydata } from "../../molecules/PanelMydata"
import { PanelNotifications } from "../../molecules/PanelNotifications"
import { PanelRecipesSaved } from "../../molecules/PanelRecipesSaved"

export const ActiveInformation = ({ infoSelect, user }) => {

    const viewer = () =>{
        switch(infoSelect){
            case "Meus dados" : {
                return <PanelMydata user={user} />
            }
            case "Minhas receitas" : {
                return <PanelListRecipes recipes={user.recipe} isMyRecipes={true} />
            }
            case "Receitas salvas" : {
                return <PanelRecipesSaved user={user} />
            }
            case "Notificações" : {
                return <PanelNotifications notifications={user.notificationUser} />
            }
            default: <h2>Erro na exibição do panel</h2>
        }
    }


    return viewer();
}