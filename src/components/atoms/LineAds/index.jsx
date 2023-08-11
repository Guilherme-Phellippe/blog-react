import { useEffect } from "react";

export default function LineAds({ children, display }) {

    useEffect(()=>{
        if (window.location.hostname !== 'localhost') {
            // Create script to Google Adsense and load to ad to display
            if (!window.hasAdsenseScriptHead) {
                const script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4781060024956035';
                script.async = true;
                document.head.appendChild(script);


                
                (window.adsbygoogle = []).push({});

                window.hasAdsenseScriptHead = true;
            }
        }
    },[])

    return (
        display &&
        <div className="my-8">
            <div className="flex justify-center opacity-25">
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                <span className="mx-2 -translate-y-1/2">Publicidade</span>
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
            {console.log("Load ads")}
            </div>
            {children}
        </div>
    )
}