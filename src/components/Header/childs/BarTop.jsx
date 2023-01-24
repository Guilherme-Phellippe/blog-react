
import { FaFacebook, FaGrinStars, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

import './bartop.css'

export const BarTop  = () => { 
    return (
        <div className="container-bar-top">
            <div className="content-social-midia">
                <FaTiktok className='icon-tiktok' />
                <FaFacebook className='icon-facebook'/>
                <FaInstagram className='icon-instagram'/>
                <FaYoutube className='icon-youtube' />
            </div>
            <div className="content-message">
                <h2>Arrase na cozinha com a gente</h2>
                <FaGrinStars />
            </div>
        </div>
    )	
}