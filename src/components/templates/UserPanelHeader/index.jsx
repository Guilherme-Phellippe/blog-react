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
        <header className="w-full h-30 md:h-40 min-h-[70px] bg-color_orange flex justify-between items-center px-4 md:px-16">
            <Link to={'/'}>
                <div className="w-1/3 md:w-1/4 h-full flex justify-center items-center cursor-pointer">
                    <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
                </div>
            </Link>
            <Button
                event={handleOutAccount}
                customClass="w-2/3 text-s1_5 text-right text-white underline"    
            >Sair da conta</Button>
        </header>
    )
}