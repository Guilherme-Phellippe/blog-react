import { createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export const ScrollToTopPage = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null
}