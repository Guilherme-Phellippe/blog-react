import { FaSave, FaCamera, FaTiktok, FaFacebook, FaInstagram } from 'react-icons/fa';


export const IconsShare = () => {
    return (
        <div className="w-1/12 fixed left-0 flex flex-col items-center">
            <FaSave className='mt-4 text-s3 cursor-pointer' />
            <FaCamera className='mt-4 text-s3 cursor-pointer' />
            <FaTiktok className='mt-4 text-s3 cursor-pointer' />
            <FaFacebook className='mt-4 text-s3 cursor-pointer' />
            <FaInstagram className='mt-4 text-s3 cursor-pointer' />
        </div>
    )
}