import { useRef, useState } from "react"
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa"
import { MdListAlt, MdRemoveCircle } from "react-icons/md"
import { useRecipeApi } from "../../../hooks/useApi"
import { Input } from "../../atoms/Input"
import { Button } from "../../atoms/Button"
import { Loading } from "../../atoms/Loading/Loading"
import { useNavigate } from "react-router-dom"
import { DialogConfirm } from "../../../modals/DialogConfirm"


export const StepThreeCreateRecipe = ({ setStep }) => {
    const recipeApi = useRecipeApi()
    const [loading, setLoading] = useState(false)
    const apiImg = useRef(useRecipeApi());
    const [images, setImages] = useState([])
    const [wordKeys, setWordKeys] = useState([])
    const [openModalDialog, setModalDialog] = useState(false)
    const [containerModal, setContainerModal] = useState()
    const refWordKeys = useRef(null)
    const navigate = useNavigate()


    const handleAddListWordKeys = () => {
        const value = refWordKeys.current.value
        !!value.length ? setWordKeys(v => [...v, value]) : alert("Digite a palavra chave")
        refWordKeys.current.value = ''
        refWordKeys.current.focus();
    }

    const handleRemoveListIngredients = ({ currentTarget }) => {
        const li = currentTarget.closest('li').querySelector('p').textContent;
        const index = wordKeys.indexOf(li);
        wordKeys.splice(index, 1)
        setWordKeys(() => [...wordKeys])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddListWordKeys()
        }
    }

    const handleUploadImages = async ({ target }) => {
        const files = target.files

        setLoading(true)
        if (files) {
            for (let file of files) {
                const form = new FormData();
                form.append('image', file);
                const { data } = await apiImg.current.hostImages(form)
                setImages(img => [...img, data])
            }
            setLoading(false)
        } else alert("erro ao enviar a imagem");
    };

    const handleRemoveImage = ({ currentTarget }) => {
        const imgForRemove = currentTarget.querySelector("img").src
        const imagesFiltered = images.filter(img => !img.small.includes(imgForRemove))
        setImages(imagesFiltered)
    }


    const handleCreateRecipe = async () => {
        setLoading(true)
        const recipe = JSON.parse(localStorage.getItem('recipe'));
        if (recipe) {
            recipe.images_recipe = images;
            recipe.wordKeys = wordKeys;
            console.log(recipe)
            const data = await recipeApi.createNewRecipe(recipe)
            console.log(data)
            if (data) {
                localStorage.removeItem("recipe")
                setContainerModal({
                    function: setModalDialog(true),
                    type: 2,
                    message: "Sua receita foi criada com sucesso!",
                    button:{
                        title: "Voltar a home",
                        event: ()=> navigate('/')
                    }
                })
            }else {
                setContainerModal({
                    function: setModalDialog(true),
                    type: 0,
                    message: "Tivemos um erro ao tentar processa sua receita, preencha os dados novamente e tente de novo",
                })
            }
            setLoading(false)
        }
    }


    return (
        <div className={`w-full flex flex-col justify-center items-center`}>
            <label
                forhtml="image-file"
                className="w-full md:w-1/2 h-[10rem] cursor-pointer border-2 border-dotted border-color_primary flex justify-center items-center relative"
            >
                <h2 className="text-s1_3 text-gray-500">
                    Clique ou solte suas imagens aqui
                </h2>

                <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadImages}
                />

                {loading && <Loading />}

            </label>
            <div className="flex m-4 w-1/2 min-h-[5rem] gap-4">
                {
                    images.map((img, index) => {
                        return (
                            <div
                                key={index}
                                onClick={handleRemoveImage}
                                className="relative w-[50px] h-[40px] cursor-pointer group">
                                <img
                                    className="w-full h-full object-cover rounded-xl group-hover:opacity-40"
                                    src={img.small} alt="imagem enviada pelo usuário" />
                                <span
                                    className="absolute w-full h-full top-1/4 left-[33%] text-s2_5 text-red-500 hidden group-hover:block font-bold">X</span>
                            </div>
                        )
                    })
                }
            </div>



            <div className="w-full md:w-1/2 flex flex-col my-8">
                <h2 className="text-s1_5 w-full text-center mb-4">Coloque palavras chaves para sua receita ficar bem ranqueada</h2>
                {!!wordKeys.length && <ul id="word-keys" className="w-1/2 mx-auto my-4 text-s1_1 flex flex-col justify-center">
                    {wordKeys.map((word, index) =>
                        <li
                            key={index}
                            className="flex items-center justify-around"
                        >
                            <p>#{word}</p> <MdRemoveCircle
                                className="text-s1_5 cursor-pointer fill-red-500 hover:fill-red-800"
                                onClick={handleRemoveListIngredients}
                            />

                        </li>)
                    }</ul>}
                <Input
                    ref={refWordKeys}
                    size={4}
                    placeholder="Digite suas palavras chaves..."
                    onKeyDown={handleKeyDown}
                    icon={<FaPlusCircle
                        className="text-s1_7 fill-green-500 cursor-pointer"
                        onClick={handleAddListWordKeys}
                    />}
                />
            </div>


            <div className="flex mt-8">

                <Button
                    id="previous"
                    type="button"
                    customClass="btn-primary text-s1_2 py-3 px-8 mx-8"
                    event={() => setStep(2)}
                ><FaArrowLeft /> Voltar</Button>

                <Button
                    customClass="btn-primary bg-green-700 text-s1_2 py-3 px-8 mx-8 relative"
                    event={handleCreateRecipe}
                >
                    { loading && <Loading />}
                    <MdListAlt /> Criar receita
                </Button>
            </div>

            {
                openModalDialog &&
                <DialogConfirm 
                    open={ { openModalDialog, setModalDialog} }
                    container={containerModal}
                />
            }
        </div>
    )
}