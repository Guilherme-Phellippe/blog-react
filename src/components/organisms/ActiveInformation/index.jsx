import { PanelListRecipes } from "../../molecules/PanelListRecipes"
import { PanelListTips } from "../../molecules/PanelListTips"
import { PanelMydata } from "../../molecules/PanelMydata"
import { PanelNotifications } from "../../molecules/PanelNotifications"
import { PanelRecipesSaved } from "../../molecules/PanelRecipesSaved"

export const ActiveInformation = ({ infoSelect, user }) => {

    const viewer = () =>{
        switch(infoSelect){
            case "Perfil" : {
                return <PanelMydata user={user} />
            }
            case "Receitas" : {
                return <PanelListRecipes recipes={user.recipe}  isMyRecipes={true} />
            }
            case "Dicas" : {
                return <PanelListTips tips={user.tips} />
            }
            case "Salvos" : {
                return <PanelRecipesSaved user={user} />
            }
            case "Notificações" : {
                return user ? <PanelNotifications notifications={user.notificationUser} />: <h2 className="text-center text-s2 p-8">Você não está logado!</h2>
            }
            default: <h2>Erro na exibição do panel</h2>
        }
    }


    return viewer();
}