import { useEffect, useMemo } from "react"

export default function Adsense({ slot, format, ...rest }) {
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
                        margin: '2rem auto',
                        maxWidth: '1000px',
                        minHeight: format === "fluid" ? '50px' : '0px',
                    }}
                    data-ad-format={format}
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot={slot}
                    {...rest}
                ></ins>
            )
        }, [format, slot, rest])
    )
}