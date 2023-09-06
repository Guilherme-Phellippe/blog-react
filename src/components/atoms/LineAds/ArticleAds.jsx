import { Img } from "../Img"

const ArticleAds = () => {

    const handleClickButton = () => {
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "ad_ingredient_list");
    }


    return (
        <div className="w-full h-[70px] md:h-[80px] flex shadow-md border-[1px] " onClick={handleClickButton}>
            <div className="w-1/6 h-full">
                <Img
                    imgs={"https://i.ibb.co/HnBMD84/Sei-bem-como-dificil-chegar-ao-final-do-m-s-faltando-dinheiro-para-pagar-as-contas-1.png"}
                    alt="imagens de uma mulher feliz por vender mais de 3000 reais em bolo de potes"

                />
            </div>
            <div className="w-5/6 flex flex-col">
                <h2 className='text-s1_3 md:text-s1_5 leading-5 sm:leading-6 h-1/2 p-1 md:p-4 font-medium text-center'>Como eu consegui faturar mais de <span className="text-orange-400 font-bold">R$ 3.000 reais</span> por mês vendendo  <span className="text-orange-400 font-bold">bolos de pote </span> em casa?</h2>
                <div className="flex p-2 md:px-4 w-full h-1/2 items-end justify-between">
                    <p className='sm:text-s1_1 md:text-s1_3 text-center w-3/4'>Clique em <span className="font-bold">SAIBA MAIS</span>, vou contar tudo</p>
                    <a
                        href="/historia-da-julia-galvao"
                        target='_blank'
                        rel="noreferrer"
                        className='md:text-lg bg-green-700 px-2 py-1 rounded-lg text-white font-medium cursor-pointer'
                    >Saiba mais</a>
                </div>
            </div>
        </div>
    )
}

export default ArticleAds
