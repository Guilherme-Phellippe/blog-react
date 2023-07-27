import { Link } from 'react-router-dom'
import { Img } from '../Img'

export const Logo = () => {

    return (
        <Link className={`w-full flex justify-center items-center`} to={'/'}>
            <Img imgs={"https://i.ibb.co/QnyS04q/Tem-Sabor.jpg"} alt={"logo do site da Tem sabor"} />
        </Link>
    )
}