import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"

import './socialmidia.css'

export const SocialMidia = () => {
    return (
        <>
            <div className="content-social-midia">
                <FaTiktok className='icon-tiktok' />
                <FaFacebook className='icon-facebook' />
                <FaInstagram className='icon-instagram' />
                <FaYoutube className='icon-youtube' />
            </div>
        </>
    )
}