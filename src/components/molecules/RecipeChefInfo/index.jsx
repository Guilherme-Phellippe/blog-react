import timer from "../../../scripts/formatTime"
import { formatTextLong } from "../../../scripts/formatTextLong"

export default function RecipeChefInfo({ recipe }){ 
    return (
        <div id="RecipeChefInfo-print" className="w-full bg-background rounded-b-3xl flex flex-col justify-center align-center p-8">
            <h2 className='w-full flex justify-center items-center text-s1_5 h-1/4 mb-4'>INFORMAÇÕES DO CHEF</h2>
            <div className='w-full h-3/4 flex justify-center align-center p-2'>
                <img className="rounded-2xl max-w-[12rem] max-h-[12rem] object-cover" src={recipe.user.photo} alt={`imagem do chef chamado ${recipe.user.name}`} />
                <div className='flex flex-col px-4'>
                    <h2 className="text-s1_4 my-1 font-semibold">{`${formatTextLong(recipe.user.name, 20)}`}</h2>
                    <h3 className="text-s1_2 my-1 font-semibold">membro desde: <span className="text-color_text font-normal">{timer(recipe.createdAt).format("dd/mm/yyyy")}</span></h3>
                    <h3 className="text-s1_2 my-1 font-semibold">receitas publicadas: <span className="text-color_text font-normal">{recipe.user._count.recipe}</span></h3>
                    <h3 className="text-s1_2 my-1 font-semibold">Total de "amei": <span className="text-color_text font-normal">{recipe.user.nmr_hearts}</span></h3>
                    <h3 className="text-s1_2 my-1 font-semibold">Prêmios receita do mês: <span className="text-color_text font-normal">Sem informações</span></h3>
                </div>
            </div>
        </div>
    )
}
