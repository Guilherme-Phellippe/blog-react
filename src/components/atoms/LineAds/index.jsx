import { useEffect } from "react"

export default function LineAds({ children, display }) {

    useEffect(()=>{
        console.log(display && "SALVOU NA VARIÁVEL ADSBYGOOGLE")

        display && 
        window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [display])

    return (
        display &&
        <div className="my-8">
            <div className="flex justify-center opacity-25">
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                <span className="mx-2 -translate-y-1/2">Publicidade</span>
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
            </div>
            {children}
        </div>
    )
}