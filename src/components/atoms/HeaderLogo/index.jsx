import { Link } from 'react-router-dom'

export const Logo = () => {

    return (
        <Link className={`w-full flex justify-center items-center`} to={'/'}>
            <div className="w-full h-full cursor-pointer">
                <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
            </div>
        </Link>
    )
}