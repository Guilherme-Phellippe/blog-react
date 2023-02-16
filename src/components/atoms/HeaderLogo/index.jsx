import { Link } from 'react-router-dom'

export const Logo = () => {

    return (
        <Link className='flex justify-center' to={'/'}>
            <div className="w-1/4 h-full flex justify-center items-center cursor-pointer bg-black">
                <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
            </div>
        </Link>
    )
}