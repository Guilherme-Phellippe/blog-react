import { useContext, useRef, useState } from "react"

import { FaArrowLeft, FaPlusCircle } from "react-icons/fa"
import { MdListAlt, MdRemoveCircle } from "react-icons/md"

import { useNotificationPush, useRecipeApi, useWhatsapp } from "../../../hooks/useApi"
import { Input } from "../../atoms/Input"
import { Button } from "../../atoms/Button"
import { Loading } from "../../atoms/Loading/Loading"
import { useNavigate } from "react-router-dom"
import { UploadImage } from "../../molecules/UploadImage"
import { dialog } from "../../../modals/Dialog"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { promptModal } from "../../../modals/Prompt";
import SubmissionStatusModal from "../../../modals/SubmissionStatusModal"



export const StepThreeCreateRecipe = ({ setStep }) => {
    const recipeApi = useRecipeApi()
    const whatsapp = useWhatsapp();
    const notificationPush = useNotificationPush();
    const { user } = useContext(HomeContext)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const [wordKeys, setWordKeys] = useState([])
    const refWordKeys = useRef(null)
    const containerStatusRef = useRef(null)
    const navigate = useNavigate()
    const [statusSendRecipe, setStatusSendRecipe] = useState([
        { name: "Tem sabor", status: 0 },
        { name: "Whatsapp Groupos", status: 0 },
        { name: "Whatsapp privado", status: 0 },
        { name: "Notificação push", status: 0 },
        { name: "Email", status: 0 },
        { name: "Sms", status: 0 },
        { name: "Pinterest", status: 0 },
        { name: "Página do facebook", status: 0 },
        { name: "Instagram", status: 0 },
    ])


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

    const handleCreateRecipe = async () => {
        // start the load on button
        setLoading(true)
        // Get the recipe info that is on local storage
        const recipe = JSON.parse(localStorage.getItem('recipe'));
        // Check if there recipe info
        if (recipe) {
            // Check if there images in useState Images
            if (images.length) {
                // Add in object 'recipe' the images and word keys
                recipe.images_recipe = images;
                recipe.wordKeys = wordKeys;
                // Crear the recipe in the database
                const data = await recipeApi.createNewRecipe(recipe);
                // Check if recipe was created
                if (data) {
                    // REMOVE RECIPE FROM STORAGE
                    localStorage.removeItem("recipe")

                    // If who is creating this recipe is admin, so send to social midas...
                    if (user.admin) {
                        const persuasiveText = await promptModal("Crie um texto persuasivo para essa receita...", true);
                        data.persuasiveText = persuasiveText
                        await handleSenderRecipes(data);
                    }

                    // REDIRECT TO USER TO RECIPE PAGE
                    const response = await dialog("Sua receita foi criada com sucesso!", 2, "Ver receita")
                    if (response) navigate(`/recipe/${data.name_recipe}/${data.id}`)
                    else navigate('/')
                } else await dialog("Tivemos um erro ao tentar processa sua receita, preencha os dados novamente e tente de novo", 0)
            } else await dialog("Sua receita precia de pelo menos uma imagem para ser criada!", 0)
        }
        setLoading(false)
    }

    const handleSenderRecipes = async (data) => {
        // Remove class 'hidden' of containerStatusRef, this make the modal appear...
        containerStatusRef.current.classList.remove("hidden")
        containerStatusRef.current.classList.add("grid")

        // Create a promisse for dialog sucess to wait for this validation to finish
        return new Promise(async (resolve) => {
            // This function change status of social midias,
            // It takes 2 parameters: statusName is the name of midia social and
            // status that takes 3 numbers -> 0: loading, 1: failed and 2: success
            const handleStatusSend = (statusName, status) => {
                setStatusSendRecipe(values => {
                    const index = values.findIndex(i => i.name === statusName);
                    values.splice(index, 1, { name: statusName, status });
                    return [...values]
                })
            }
            //If this code got there its why already publish the recipe on database,
            //so send a number 2 (success) to "Tem sabor"
            handleStatusSend("Tem sabor", 2)
            //Send the recipe to group whatsapp
            const whatsappResponse = await whatsapp.sendRecipe(data).catch(err => console.log(err))
            whatsappResponse?.status === 200 ? handleStatusSend("Whatsapp Groupos", 2) : handleStatusSend("Whatsapp Groupos", 1)
            //Send the recipe to notification push
            const notificationResponse = await notificationPush.sendNotification(data).catch(err => console.log(err))
            notificationResponse?.status === 200 ? handleStatusSend("Notificação push", 1) : handleStatusSend("Notificação push", 1)

            handleStatusSend("Whatsapp privado", 1)
            handleStatusSend("Email", 1)
            handleStatusSend("Sms", 1)
            handleStatusSend("Pinterest", 1)
            handleStatusSend("Página do facebook", 1)
            handleStatusSend("Instagram", 1)

            //Wait 1,5s to finish, this make it look prettier before closing...
            setTimeout(() => {
                containerStatusRef.current.classList.remove("grid")
                containerStatusRef.current.classList.add("hidden")
                resolve()
            }, 1500);
        })
    }



    return (
        <div className={`w-full flex flex-col justify-center items-center`}>

            <UploadImage
                images={images}
                setImages={setImages}
            />


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
                    {loading ? <Loading /> : <span className="text-white flex justify-center gap-2"><MdListAlt /> Criar receita</span>}
                </Button>
            </div>

            <SubmissionStatusModal
                ref={containerStatusRef}
                statusSendRecipe={statusSendRecipe}
            />
        </div>
    )
}