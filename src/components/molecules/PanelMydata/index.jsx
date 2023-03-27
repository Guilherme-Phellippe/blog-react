import { useState } from "react";
import { Button } from "../../atoms/Button"

export const PanelMydata = ({ user }) => {
    const [isOpenSaveData, setIsOpenSaveData] = useState(false)
    const [inputName, setInputName] = useState(user?.name)
    const [inputEmail, setInputEmail] = useState(user?.email)
    const { nmr_eyes, nmr_hearts, _count, winner , nmr_saved} = user;
    const infos = [
        { name: 'Total de visualização:', value: nmr_eyes },
        { name: 'Total de amei em receitas:', value: nmr_hearts },
        { name: 'Total de receitas salvas', value: nmr_saved },
        { name: 'Total de comentários', value: _count.comments },
        { name: 'Total de prêmios:', value: winner ? winner : 0 }
    ]

    const handleUpdateUser = ({ target }) => {
        if (target.textContent === "Salvar dados") {
            alert('usuario atualizado com sucesso')
        }
    }

    const handleUploadPhoto = () => {

    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center gap-12">
                <label
                    event={handleUploadPhoto}
                    className="w-44 h-44 mt-12 flex flex-start relative cursor-pointer"
                    htmlFor="file">
                    <input className="hidden" type="file" id="file" accept="image/*" />
                    <img className="w-full h-full" src={user.photo} alt="" />
                    <span id="file" className="btn-primary w-full absolute bottom-0"> Alterar foto de perfil</span>
                </label>
                <div className="flex flex-col justify-center items-center gap-8 py-8">
                    <input type="text"
                        className="p-4"
                        placeholder="Seu nome copmpleto..."
                        onChange={(e) => setInputName(e.target.value)}
                        value={inputName}
                        disabled={!isOpenSaveData}
                    />
                    <input type="text"
                        className="p-4"
                        placeholder="Seu e-mail..."
                        onChange={(e) => setInputEmail(e.target.value)}
                        value={inputEmail}
                        disabled={!isOpenSaveData}
                    />
                    <Button>Mudar senha</Button>
                </div>
            </div>
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

            <Button
                event={(e) => { setIsOpenSaveData(v => !v); handleUpdateUser(e); }}
                customClass="btn-primary px-12 py-4">{isOpenSaveData ? "Salvar dados" : "Alterar dados"}</Button>
        </div>
    )
}