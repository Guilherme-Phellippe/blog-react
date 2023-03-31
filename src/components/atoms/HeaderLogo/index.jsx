import { Link } from 'react-router-dom'

export const Logo = ({ hidden }) => {

    return (
        <Link className={hidden} to={'/'}>
            <div className="w-1/4 md:w-1/3 h-full flex justify-center items-center cursor-pointer">
                <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
            </div>
        </Link>
    )
}