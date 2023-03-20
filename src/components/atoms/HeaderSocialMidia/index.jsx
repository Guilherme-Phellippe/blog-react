import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"

export const SocialMidia = ({ hidden }) => {
    return (
        <div className={`w-1/4 px-4 flex justify-center gap-2 ${hidden}`}>
            <a href="https://www.tiktok.com/@temsaboroficial" target="_blank" rel="noreferrer">
                <FaTiktok className='my-2 text-s1_5 cursor-pointer rounded-full transition-all bg-black text-white' />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100089888256334" target="_blank" rel="noreferrer">
                <FaFacebook className='my-2 text-s1_5 cursor-pointer rounded-full transition-all text-[#3b5998] bg-white' />
            </a>
            <a href="https://instagram.com/tem_saborofc/" target="_blank" rel="noreferrer">
                <FaInstagram className='my-2 text-s1_5 cursor-pointer rounded-full transition-all text-white bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500' />
            </a>
            <a href="https://www.youtube.com/@temsaboroficial" target="_blank" rel="noreferrer">
                <FaYoutube className='my-2 text-s1_5 cursor-pointer rounded-full transition-all text-red-500 bg-white' />
            </a>
        </div>
    )
}
