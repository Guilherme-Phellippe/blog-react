import { useRef, useState } from "react"
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa"
import { Button } from "../../components/atoms/Button"
import { Input } from "../../components/atoms/Input"
import { Loading } from "../../components/atoms/Loading/Loading"
import { useUserApi } from "../../hooks/useApi"

export const BoxChangePassword = ({ setShowModal, id }) => {
    const [openEyePassword, setOpenEyePassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const refCurrentPass = useRef()
    const refNewPass = useRef()
    const refConfirmPass = useRef()
    const userApi = useUserApi()

    const handleUpdatePassword = async () => {
        setLoading(true)
        if (refConfirmPass.current.value.length >= 8 && refNewPass.current.value === refConfirmPass.current.value) {
            const box = {
                id, 
                currentPassword: refCurrentPass.current.value,
                newPassword: refConfirmPass.current.value
            }

            const response = await userApi.updatePassword(box).catch(error =>{
                alert("Senha incorreta, tente novamente")
                refCurrentPass.current.value = ''
            })
            if(response.status === 201){
                alert("Senha atualizada com sucesso!")
                setShowModal(false)
            } else alert("Erro ao tentar alterar sua senha, entre em contato com o suporte!")

        } else alert("Senha muito fraca ou não são iguais!")

        setLoading(false)
    }

    return (
        <div className="w-screen h-screen grid place-content-center bg-[#24242480] fixed top-0">
            <div className="flex flex-col items-center bg-white p-8 rounded-xl relative">
                <span onClick={() => setShowModal(false)} className="absolute top-0 right-2 text-red-500 text-s2 cursor-pointer opacity-50">X</span>
                <h2 className="text-s1_5 mb-6">Digite sua senha atual</h2>
                <Input
                    ref={refCurrentPass}
                    type={!openEyePassword ? "password" : "text"}
                    eventIcon={() => setOpenEyePassword((value) => !value)}
                    onKeyDown={(e) => { if(e.code === "Enter") refNewPass.current.focus() }}
                    icon={openEyePassword ? <FaEye className="text-s1_5 cursor-pointer" /> : <FaEyeSlash className="text-s1_5 cursor-pointer" />}
                />
                <h2 className="text-s1_5 my-6">Digite sua nova senha:</h2>
                <Input
                    ref={refNewPass}
                    type="password"
                    icon={<FaLock />}
                    onKeyDown={(e) => { if(e.code === "Enter") refConfirmPass.current.focus() }}
                    customWidthAndMargin="w-full my-4"

                />
                <Input
                    ref={refConfirmPass}
                    type="password"
                    icon={<FaLock />}
                    onKeyDown={(e) => { if(e.code === "Enter") handleUpdatePassword()}}
                    customWidthAndMargin="w-full my-4"
                />

                <Button
                    event={handleUpdatePassword}
                    customClass="btn-primary px-16 py-3 mt-8 mb-4 relative"
                >Alterar senha {loading && <Loading />}</Button>
            </div>
        </div>
    )
}