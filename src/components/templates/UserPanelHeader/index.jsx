import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../atoms/Button"
import { ImExit } from "react-icons/im"

export const UserPanelHeader = () => {
    const navigate = useNavigate()

    const handleOutAccount = () => {
        //eslint-disable-next-line
        const canExit = confirm("deseja realmente sair da sua conta?");

        if (canExit) {
            localStorage.removeItem("token");
            navigate('/')
        }
    }

    return (
        <header className="w-full h-28 md:h-40 min-h-[70px] bg-color_orange flex justify-between items-center px-4 md:px-16">
            <Link className="w-1/3 h-full" to={'/'}>
                <div className=" md:w-1/4 h-full flex justify-center items-center cursor-pointer">
                    <img className='w-full h-full object-contain' src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="logo da tem sabor" />
                </div>
            </Link>
            <Button
                event={handleOutAccount}
                customClass="text-s1_5 text-right text-white flex gap-4 items-center border border-white p-2 px-4 rounded-2xl"
            >
                Sair da conta <ImExit /> 
            </Button>
        </header>
    )
}