import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../atoms/Button"

export const UserPanelHeader = () => {
    const navigate = useNavigate()

    const handleOutAccount = () =>{
        //eslint-disable-next-line
        const canExit = confirm("deseja realmente sair da sua conta?");

        if(canExit){
            localStorage.removeItem("token");
            navigate('/')
        }
    }

    return (
        <header className="w-full h-40 min-h-[70px] bg-color_primary flex justify-between items-center px-16">
            <Link to={'/'}>
                <div className="w-1/4 h-full flex justify-center items-center cursor-pointer">
                    <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
                </div>
            </Link>
            <Button
                event={handleOutAccount}
                customClass="text-s1_5 text-white underline"    
            >Sair da conta</Button>
        </header>
    )
}