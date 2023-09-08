import { useEffect, useRef } from "react";
import { Img } from "../Img";

const images = {
    mobile: [
        "https://i.ibb.co/pQZqcZy/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO-1.jpg",
        "https://i.ibb.co/pQZqcZy/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO-1.jpg",
        "https://i.ibb.co/pQZqcZy/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO-1.jpg",
    ],
    desktop: [
        "https://i.ibb.co/HPsW7w6/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO.jpg",
        "https://i.ibb.co/HPsW7w6/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO.jpg",
        "https://i.ibb.co/HPsW7w6/F-RMULA-AVAN-ADA-PARA-O-COMBATE-DAS-DORES-ARTICULARES-E-DO-CORPO.jpg"
    ]
}

const BannerAds = () => {
    const refContainer = useRef()


    //efeito no banner de anuncio
    useEffect(() => {
        var count = 0;
        const img = refContainer.current.querySelector("img")
        img.src = window.innerWidth >= 680 ? images.desktop[count] : images.mobile[count]

        const interval = setInterval(() => {
            count >= 2 ? count = 0 : count++;
            img.src = window.innerWidth >= 680 ? images.desktop[count] : images.mobile[count]
        }, 7000);



        return () => clearInterval(interval)
    }, []);


    const handleClickButton = () => {
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "banner_curcumy_ad");
    }


    return (
        <div
            id="banner-ads"
            ref={refContainer}
            onClick={handleClickButton}
            className="w-full h-[170px] md:h-[180px] lg:h-[220px] shadow-md my-12 black cursor-pointer relative overflow-hidden"
        >   
        <a href={"https://ev.braip.com/campanhas/cpa/camylxlo1"}>
            <Img imgs={""} object={"cover"} />
        </a>
        </div>
    )
}

export default BannerAds

