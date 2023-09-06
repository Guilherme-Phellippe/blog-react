import { Img } from "../Img"

const ArticleAds = () => {

    const handleClickButton = () => {
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "ad_ingredient_list");
    }


    return (
        <div className="flex max-h-[80px] shadow-md border-[1px] " onClick={handleClickButton}>
            <div className="w-1/5">
                <Img
                    imgs={"https://i.ibb.co/HnBMD84/Sei-bem-como-dificil-chegar-ao-final-do-m-s-faltando-dinheiro-para-pagar-as-contas-1.png"}
                    alt="imagens de uma mulher feliz por vender mais de 3000 reais em bolo de potes"
                    object="contain"

                />
            </div>
            <div className="w-4/5 flex flex-col">
                <h2 className='text-s1_5 h-1/2 p-4 font-medium text-center'>Como eu consegui faturar mais de <span className="text-orange-400 font-bold">R$ 3.000 reais</span> por mês vendendo  <span className="text-orange-400 font-bold">bolos de pote </span> em casa?</h2>
                <div className="flex p-2 md:px-4 w-full h-1/2 items-end justify-between">
                    <p className='text-s1_3 text-center w-3/4'>Clique em <span className="font-bold">SAIBA MAIS</span> e eu conto tudinho...</p>
                    <a
                        href="/historia-da-julia-galvao"
                        target='_blank'
                        rel="noreferrer"
                        className='text-lg bg-green-700 px-2 py-1 rounded-lg text-white font-medium cursor-pointer'
                    >Saiba mais</a>
                </div>
            </div>
        </div>
    )
}

export default ArticleAds
