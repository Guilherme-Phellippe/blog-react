import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { dialog } from '../../../modals/Dialog'
import { useTipApi } from "../../../hooks/useApi";
import { IoCreate } from  'react-icons/io5'

import { Button } from "../../atoms/Button"
import { Input } from "../../atoms/Input";
import { Loading } from "../../atoms/Loading/Loading";
import { TextEditor } from "../../molecules/TextEditor"
import { UploadImage } from "../../molecules/UploadImage";
import { UserContext } from "../../../contexts/userProvider";


export const MainCreateTip = () => {
    const tipApi = useTipApi()
    const { user } = useContext(UserContext)
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [align, setAlign] = useState('text-left')
    const [images, setImages] = useState([])

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCreateTip = async () => {
        setLoading(true)
        if (user) {
            if (!!title && title.length > 5) {
                if (!!images.length) {
                    if (!!text && text.length > 100) {

                        const data = {
                            userId: user.id,
                            name_tip: title,
                            images: images[0],
                            description_tip: `<p class=${align}>${text}</p>`
                        }

                        const response = await tipApi.createNewTip(data);

                        if (response) {
                            const response = await dialog("Sua dica foi publicada com sucesso!", 2 , "Ver receita");
                            if(response) navigate(`/tip/${title.replace('?','')}/${response.id}`)
                        }
                        setLoading(false)
                    } else await dialog("Sua dica não pode estar em vazia ou com menos de 100 caracteres, por favor preencha e tente novamente", 1)
                }else await dialog("Sua dica precisa ter uma imagem que represente sua ídeia central, por favor preencha e tente novamente.", 1)
            } else await dialog("O nome da sua dica está vazia ou é muito pequena, por favor corrija e tente novamente", 1)
        } else {
            const response = await dialog("Você precisa criar uma conta para publicar essa dica!", 1 , "Criar conta")
            if(response) navigate('/register')
        }
        setLoading(false)
    }

    return (
        <main className="w-full max-w-[1500px] mx-auto bg-white">
            <div className="w-full h-full flex flex-col items-center p-12">
                <h2 className="text-s2 font-bold text-color_orange">Vamos criar um dica?</h2>



                <div className="flex flex-col my-12 w-full md:w-2/3">

                    <Input
                        placeholder="Digite o titulo da sua dica..."
                        customWidthAndMargin="mb-16"
                        label="Qual o nome da sua dica?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-s1_5 p-4">Envie uma imagem sobre sua dica:</h2>
                        <UploadImage
                            images={images}
                            setImages={setImages}
                        />
                    </div>

                    <TextEditor
                        setText={setText}
                        text={text}
                        title={title}
                        setAlign={setAlign}
                        align={align}
                        images={images}
                    />
                </div>
                <div className="flex relative">
                    {loading && <Loading />}
                    <Button
                        event={handleCreateTip}
                        customClass="btn-primary text-s1_5 flex px-8 py-3"
                    >
                        Publicar Dica <IoCreate className="text-s1_5" />
                    </Button>
                </div>
            </div>
        </main>
    )
}