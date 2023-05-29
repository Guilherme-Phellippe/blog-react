import { useEffect, useMemo } from "react"

export const Adsense = ({ slot, format, ...rest }) => {
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
                        minHeight: format === "fluid" ? '20rem' : '0px',
                        minWidth: format === "fluid" ? '250px' : '0px',
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