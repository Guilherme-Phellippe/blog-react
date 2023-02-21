import { useNavigate } from "react-router-dom"
import { Button } from "../../components/atoms/Button"

export const BoxMenssage = ({ menssage, setOpen }) => { 
    const navigate = useNavigate()

    
    const handleButtonOk = () =>{
        navigate('/')
        setOpen(false)
    }


    return(
        <div className="fixed w-screen h-screen top-0 grid place-items-center bg-[#24242440]">
            <div className="flex flex-col border-[1px] border-solid border-green-500 bg-white w-1/3 rounded-2xl p-4">
                <h2>{menssage}</h2>
                <div className="flex">
                    <Button event={handleButtonOk}>Ok</Button>
                </div>
            </div>
        </div>
    )
}