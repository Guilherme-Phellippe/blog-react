import { Img } from "../Img"

const ArticleAds = () => {

    const handleClickButton = () => {
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "ad_curcumy_ingredient_list");
        window.location.href= "https://ev.braip.com/pv/lipndovp/afi8jjq9px"
    }


    return (
        <div className="w-full h-[70px] md:h-[80px] flex shadow-md border-[1px] " onClick={handleClickButton}>
            <div className="w-1/6 h-full">
                <Img
                    imgs={"https://i.ibb.co/dPn7Rn3/imagem1-min.png"}
                    alt="imagens de uma mulher feliz por vender mais de 3000 reais em bolo de potes"
                    object="contain"
                />
            </div>
            <div className="w-5/6 flex flex-col">
                <h2 className='text-s1_3 md:text-s1_5 leading-5 sm:leading-6 h-1/2 p-1 md:p-4 font-medium text-center'>
                <span className="text-red-700 font-bold"> Dores nas juntas? </span>
                    Por que a industria farmacêutica  
                    <span className="text-red-700 font-bold"> não quer </span>
                    que você saiba dessa 
                    <span className="text-green-700 font-bold"> descoberta?</span>
                </h2>
                <div className="flex p-2 md:px-4 w-full h-1/2 items-end justify-between">
                    <p className='sm:text-s1_1 md:text-s1_3 text-center w-3/4'>Clique em <span className="font-bold">SAIBA MAIS</span>, vou contar tudo</p>
                    <a
                        href="https://ev.braip.com/pv/lipndovp/afi8jjq9px"
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
