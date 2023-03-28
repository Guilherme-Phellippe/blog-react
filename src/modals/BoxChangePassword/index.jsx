import { useState } from "react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import { Button } from "../../components/atoms/Button"
import { Input } from "../../components/atoms/Input"

export const BoxChangePassword = ({ setShowModal }) => {
    const [openEyePassword, setOpenEyePassword] = useState(false)

    return (
        <div className="w-screen h-screen grid place-content-center bg-[#24242480] fixed top-0">
            <div className="flex flex-col items-center bg-white p-8 rounded-xl relative">
                <span onClick={() => setShowModal(false)} className="absolute top-0 right-2 text-red-500 text-s2 cursor-pointer opacity-50">X</span>
                <h2 className="text-s1_5 mb-6">Digite sua senha atual</h2>
                <Input
                    type={!openEyePassword ? "password" : "text"}
                    eventIcon={() => setOpenEyePassword((value) => !value)}
                    icon={openEyePassword ? <FaEye className="text-s1_5 cursor-pointer" /> : <FaEyeSlash className="text-s1_5 cursor-pointer" />}
                />
                 <h2 className="text-s1_5 my-6">Digite sua nova senha:</h2>
                <Input
                    type="password"
                    icon={<FaLock />}
                    customWidthAndMargin="w-full my-4"

                />
                <Input
                    type="password"
                    icon={<FaLock />}
                    customWidthAndMargin="w-full my-4"
                />

                <Button event={()=> alert("Sistema ainda não disponível, entre em contato conosco.")} customClass="btn-primary px-16 py-3 mt-8 mb-4">Alterar senha</Button>
            </div>
        </div>
    )
}