import { useEffect, useRef } from "react";
import { Img } from "../Img";

const images = {
    mobile: [
        "https://i.ibb.co/zbKm768/Design-sem-nome-9.jpg",
        "https://i.ibb.co/bv1yj42/2.jpg",
        "https://i.ibb.co/1MCsJ01/3.jpg",
    ],
    desktop: [
        "https://i.ibb.co/LzMcDBT/Como.jpg",
        "https://i.ibb.co/ryvdkR5/2.jpg",
        "https://i.ibb.co/42Ryq93/3.jpg"
    ]
}

const BannerAds = () => {
    const refContainer = useRef()


    //efeito no banner de anuncio
    useEffect(() => {
        var count = 0;
        const img = refContainer.current.querySelector("img")
        img.src = window.innerWidth >= 680 ? images.desktop[count] : images.mobile[count]

        const interval = setInterval(()=>{
            count >= 2 ? count = 0 : count++;
            img.src = window.innerWidth >= 680 ? images.desktop[count] : images.mobile[count]
        }, 7000);



        return () => clearInterval(interval)
    }, []);


    const handleClickButton = () => {
        // eslint-disable-next-line no-undef
        fbq('trackCustom', "banner_top");
    }

    return (
        <div
            id="banner-ads"
            ref={refContainer}
            onClick={handleClickButton}
            className="w-full h-[170px] md:h-[170px] lg:h-[180px] shadow-md my-12 black cursor-pointer relative overflow-hidden"
        >
            <a href="https://go.hotmart.com/F86370228D" target='_blank' rel="noreferrer">
                <Img imgs={""} object={window.innerWidth >= 680 ? "contain" : "cover"} />
            </a>
        </div>
    )
}

export default BannerAds