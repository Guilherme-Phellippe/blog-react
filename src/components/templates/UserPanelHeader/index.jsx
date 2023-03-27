import { Link } from "react-router-dom"

export const UserPanelHeader = () => {
    return (
        <header className="w-full h-40 min-h-[70px] bg-color_primary flex justify-between items-center px-16">
            <Link to={'/'}>
                <div className="w-1/4 h-full flex justify-center items-center cursor-pointer">
                    <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
                </div>
            </Link>
            <input type="range" max={1} min={0} />
        </header>
    )
}