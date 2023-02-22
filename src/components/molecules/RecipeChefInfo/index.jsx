export const RecipeChefInfo = ({ author, createdAt }) => {
    return (
        <div id="RecipeChefInfo-print" className="w-full h-64 bg-background rounded-b-3xl flex flex-col justify-center align-center">
            <h2 className='w-full flex justify-center items-center text-s1_5 h-1/4'>INFORMAÇÕES DO CHEF</h2>
            <div className='w-full h-3/4 flex justify-center align-center p-2'>
                <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt={`imagem do chef chamado ${author}`} />
                <div className='flex flex-col px-4'>
                    <h2>{` ${author}`}</h2>
                    <h3>{`membro desde: ${new Date(createdAt).toLocaleDateString('pt-BR')}`}</h3>
                    <h3>{`receitas publicadas: 8`}</h3>
                    <h3>{`Total de 'amei': 345`}</h3>
                    <h3>{`Prêmios receita do mês: 2`}</h3>
                </div>
            </div>
        </div>
    )
}