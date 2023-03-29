import { useRef, useState } from "react";
import { FaDatabase, FaLockOpen, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRecipeApi, useUserApi } from "../../../hooks/useApi"

import { BoxChangePassword } from "../../../modals/BoxChangePassword";
import { Button } from "../../atoms/Button"
import { Loading } from "../../atoms/Loading/Loading"

export const PanelMydata = ({ user }) => {
    const apiImg = useRecipeApi();
    const [isOpenSaveData, setIsOpenSaveData] = useState(false)
    const [inputName, setInputName] = useState(user?.name)
    const [inputEmail, setInputEmail] = useState(user?.email)
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const refUserApi = useUserApi()
    const refInputName = useRef()
    const navigate = useNavigate()
    const { nmr_eyes, nmr_hearts, _count, winner, nmr_saved } = user;
    const infos = [
        { name: 'Total de visualização:', value: nmr_eyes },
        { name: 'Total de amei em receitas:', value: nmr_hearts },
        { name: 'Total de receitas salvas', value: nmr_saved },
        { name: 'Total de comentários', value: _count.comments },
        { name: 'Total de prêmios:', value: winner ? winner : 0 }
    ]

    const handleUpdateUser = async ({ target }) => {
        setLoading(true)
        refInputName.current.click();
        if (target.textContent === "Salvar dados") {
            const userData = {
                id: user.id,
                name: inputName,
                email: inputEmail,
                photo: user.photo
            }
            const response = await refUserApi.updateUser(userData);
            if (response.status === 200) alert("Seus dados forão atualizados com sucesso!");
            else alert("Falha ao atualizar seus dados, entre com contato com suporte.")
        }
        setLoading(false)
    }

    const handleUploadPhoto = async ({ currentTarget }) => {
        setLoading(true)
        const file = currentTarget.querySelector("input#file").files[0]

        if (file) {
            const form = new FormData();
            form.append('image', file);

            const { data } = await apiImg.hostImages(form)

            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                photo: data.medium
            }
            const response = await refUserApi.updateUser(userData);
            if (response.status === 200) currentTarget.querySelector("img").src = data.medium
            else alert("Falha ao atualizar sua foto, entre com contato com suporte.")

        } else alert("erro ao processar sua foto, tente novamente mais tarde.");

        setLoading(false)
    }

    const handleDeleteUser = async () => {
        if (user) {
            const responseUser = prompt("Digite seu email para excluir essa conta:");
            if (user.email.toLowerCase() === responseUser.toLowerCase()) {
                const response = await refUserApi.deleteUser(user.id).catch(error => {
                    console.error(error)
                    alert("falha ao tentar excluir o usuario, tente novamente mais tarde")
                })

                if (response.status === 200) {
                    alert("Conta excluida com sucesso!")
                    localStorage.removeItem("token")
                    navigate('/')
                }
            } else alert("E-mail incorreto, tente novamente")
        }
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center gap-12">
                <label
                    onChange={handleUploadPhoto}
                    className="w-44 h-44 mt-12 flex flex-start relative cursor-pointer"
                    htmlFor="file"
                >
                    {loading && <Loading />}
                    <input className="hidden" type="file" id="file" accept="image/*" />
                    <img className="w-full h-full object-cover" src={user.photo} alt="" />
                    <span id="file" className="btn-primary w-full absolute bottom-0 rounded-none"> Alterar foto de perfil</span>
                </label>
                <div className="w-1/2 flex flex-col justify-center p-8 my-4">
                    <div className="flex justify-between items-center gap-x-4 mb-4">
                        <label htmlFor="input-name" className="text-s1_3 mt-4 mb-2 text-color_sub_text">Nome completo:</label>
                        <input type="text"
                            ref={refInputName}
                            id="input-name"
                            className={`p-4 text-s1_2 rounded-xl ${isOpenSaveData ? "border-[1px] border-color_primary bg-background outline-none" : 'bg-transparent'}`}
                            placeholder="Seu nome copmpleto..."
                            onChange={(e) => setInputName(e.target.value)}
                            value={inputName}
                            disabled={!isOpenSaveData}
                        />
                    </div>
                    <div className="flex justify-between items-center gap-x-4 my-4">
                        <label htmlFor="input-email" className="text-s1_3 mt-4 mb-2 text-color_sub_text"> E-mail:</label>
                        <input type="text"
                            id="input-email"
                            className={`p-4 text-s1_2 rounded-xl ${isOpenSaveData ? "border-[1px] border-color_primary bg-background outline-none" : 'bg-transparent'}`}
                            placeholder="Seu e-mail..."
                            onChange={(e) => setInputEmail(e.target.value)}
                            value={inputEmail}
                            disabled={!isOpenSaveData}
                        />
                    </div>
                    <Button customClass="btn-second px-6 mx-auto my-4 text-s1_1 text-center" event={() => setShowModal(true)}>Mudar senha <FaLockOpen /> </Button>
                </div>
            </div>
            <Button
                event={(e) => { setIsOpenSaveData(v => !v); handleUpdateUser(e); }}
                customClass="btn-primary px-12 py-4 text-s1_2 relative">
                {isOpenSaveData ? "Salvar alteração" : "Alterar dados"}
                {isOpenSaveData ? <FaSave /> : <FaDatabase />}

                {loading && <Loading />}
            </Button>
            <div className="w-full flex flex-col items-center my-8">
                <h2 className="text-s1_5 mb-6">Informações gerais</h2>
                <div className='w-4/5 flex flex-wrap justify-evenly px-4 gap-8 border-[1px] border-[#0001] p-4 rounded-xl'>
                    {infos.map((info, key) => <div key={key} className="flex flex-col justify-between items-center w-1/5 py-4 bg-white rounded-xl shadow-md border-[1px] border-color_second hover:scale-105 transition-all">
                        <h3 className="text-s1_3 text-center text-color_text">{info.name}</h3>
                        <span className="text-s1_5 font-semibold text-color_primary my-4">{info.value}</span>
                    </div>)}
                </div>
            </div>
            {
                winner &&
                <div className="flex flex-col justify-center items-center">
                    <h2>Todos seus prêmios:</h2>
                </div>

            }
            {/* BOX PASSWORD WHEN USER CLICK TO CHANGE PASSWORD */}
            {
                showModal && <BoxChangePassword setShowModal={setShowModal} id={user.id} />
            }
            <span
                onClick={handleDeleteUser}
                className="underline cursor-pointer text-red-400 text-s1"
            >Deletar conta</span>
        </div>
    )
}