import { useEffect, useRef } from "react";
import { Img } from "../Img";

const BannerAds = () => {
    const refContainerTextAd = useRef()


    //efeito no banner de anuncio
    useEffect(() => {
        const interval = setInterval(() => {

            const allH2 = refContainerTextAd.current.querySelectorAll("h2")
            allH2.forEach(h2 => {
                h2.classList.add("translate-y-0")
                h2.classList.remove("translate-y-80")
            });
        }, 1500);

        return () => clearInterval(interval)
    }, []);


    const handleClickButton = ()=>{
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "banner_amazon_top");
    }

    return (
        <div 
            id="banner-ads" 
            onClick={handleClickButton}
            className="w-full h-[100px] md:h-[150px] lg:h-[180px] my-12 black cursor-pointer relative overflow-hidden"
        >
            <a href="https://amzn.to/3sCfnWg" target='_blank' rel="noreferrer">
                <Img imgs={"https://i.ibb.co/7SjJhyp/Tudo-para-1.jpg"} />
                <div ref={refContainerTextAd} className="flex flex-col">
                    <h2 className='translate-y-80 transition-transform duration-500 absolute top-[7%] lg:top-[10%] -translate-x-1/2 left-1/2 text-s1_2 md:text-s1_7 lg:text-s2_5 text-zinc-100 font-bold'>Tudo para sua</h2>
                    <h2 className='translate-y-80 transition-transform duration-500 absolute top-[18%] lg:top-[22%] -translate-x-1/2 left-1/2 text-s2_5 md:text-s3 lg:text-s4 text-color_orange font-bold'>Cozinha</h2>
                    <h2 className='translate-y-80 transition-transform duration-500 absolute top-[42%] lg:top-[45%] -translate-x-1/2 left-1/2 text-s1_2 md:text-s1_5 lg:text-s1_7 text-zinc-100 font-bold'>está aqui</h2>
                    <h2 className='translate-y-80 transition-transform duration-500 absolute top-[58%] lg:top-[58%] -translate-x-1/2 left-1/2 text-s1_2 md:text-s1_5 lg:text-s1_7 text-zinc-100 font-bold'>com <span className='bg-color_red rounded-lg px-1'>Frete grátis</span></h2>
                    <h2 className='translate-y-80 transition-transform duration-500 absolute top-[75%] lg:top-[75%] -translate-x-1/2 left-1/2 text-s1_2 md:text-s1_5 lg:text-s1_7 text-zinc-100 bg-green-700 md:p-2 lg:p-3 px-4 rounded-2xl font-bold'>Venha conferir</h2>
                </div>
            </a>
        </div>
    )
}

export default BannerAds