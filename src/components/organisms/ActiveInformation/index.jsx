import { PanelListRecipes } from "../../molecules/PanelListRecipes"
import { PanelMydata } from "../../molecules/PanelMydata"

export const ActiveInformation = ({ infoSelect, user }) => {

    const viewer = () =>{
        switch(infoSelect){
            case "Meus dados" : {
                return <PanelMydata user={user} />
            }
            case "Minhas receitas" : {
                return <PanelListRecipes recipes={user.recipe} />
            }
            case "Notificações" : {
                return <h2>Sistema ainda não disponível =(</h2>
            }
            case "Sair" : {
                return <h2>Sair</h2>
            }
            default: <h2>Erro na exibição do panel</h2>
        }
    }


    return viewer();
}