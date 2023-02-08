import { Link } from 'react-router-dom'
import './styles.css'

export const Logo = () => {

    return (
        <Link to={'/'}>
            <div className="content-logo">
                <img src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
            </div>
        </Link>
    )
}