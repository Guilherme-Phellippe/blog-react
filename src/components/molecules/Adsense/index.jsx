import { useEffect, useMemo } from "react"

export const Adsense = ({ slot, format }) => {
    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' && (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])

    return (
        useMemo(() => {
            return (
                <ins className="adsbygoogle"
                    style={{
                        display: 'block',
                        border: '1px solid #00000007',
                        margin: '2rem auto',
                        maxWidth: '1000px',
                        minHeight: format === "fluid" ? '30px' : '0px',
                        minWidth: format === "fluid" ? '250px' : '0px',
                    }}
                    data-ad-format={format}
                    data-ad-layout-key={format === "fluid" ? "-6o+ed+2i-1n-4w" : ''}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot={slot}
                    data-full-width-responsive="true"
                ></ins>
            )
        }, [format, slot])
    )
}