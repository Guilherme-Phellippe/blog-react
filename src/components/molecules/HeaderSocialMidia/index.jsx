import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"

import './socialmidia.css'

export const SocialMidia = () => {
    return (
        <div className="content-social-midia">
            <a href="https://www.tiktok.com/@temsaboroficial" target="_blank" rel="noreferrer">
                <FaTiktok className='icon-tiktok' />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100089888256334" target="_blank" rel="noreferrer">
                <FaFacebook className='icon-facebook' />
            </a>
            <a href="https://instagram.com/tem_saborofc/" target="_blank" rel="noreferrer">
                <FaInstagram className='icon-instagram' />
            </a>
            <a href="https://www.youtube.com/@temsaboroficial" target="_blank" rel="noreferrer">
                <FaYoutube className='icon-youtube' />
            </a>
        </div>
    )
}