import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCategoryApi, useUserApi, useRecipeApi } from "../../../hooks/useApi"

import { FaArrowLeft, FaArrowRight, FaWindowClose } from "react-icons/fa"
import { MdImage, MdImportContacts, MdList } from "react-icons/md"

import { BoxMenssage } from "../../../modals/BoxMenssage"

import { Button } from "../../atoms/Button"
import { StepOneCreateRecipe } from "../../organisms/StepOneCreateRecipe"
import { StepThreeCreateRecipe } from "../../organisms/StepThreeCreateRecipe"
import { StepTwoCreateRecipe } from "../../organisms/StepTwoCreateRecipe"
import { modelRecipe } from "../../../scripts/modelRecipe"


export const MainCreateRecipe = () => {
    const categoryApiRef = useRef(useCategoryApi())
    const userApiRef = useRef(useUserApi())
    const recipeApiRef = useRef(useRecipeApi())
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState([])
    const [step, setStep] = useState(1)
    const [images, setImages] = useState([])
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false)
    const [modalMenssage, setModalMenssage] = useState('')
    const [hasRecipeReady, setHasRecipeReady] = useState(localStorage.getItem('recipe'));
    const refOneStep = useRef();
    const refTwoStep = useRef();
    const refThreeStep = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const categories = await categoryApiRef.current.getAllCategory();
            if (categories) setCategories(categories.data)
            const data = await userApiRef.current.authenticateLogin();
            if (data) setUser(data.data);
            else navigate('/');
        })();
    }, [navigate]);

    const handleNextButton = async (e) => {
        e.preventDefault()
        if (e.currentTarget.id === "next") {
            const ingredients = Array.from(refTwoStep.current.querySelectorAll('ul#ing li p')).map(p => p.textContent)
            const wordKey = Array.from(refThreeStep.current.querySelectorAll('ul#word-keys li p')).map(p => p.textContent)

            if (step === 1) {
                const category = refOneStep.current.querySelector('div input#category').value;
                const formatCategoryUpperCase = category.charAt(0).toUpperCase() + category.slice(1)
                const response = await categoryApiRef.current.createNewCategory(formatCategoryUpperCase);

                if (response.data) {
                    var categoriesData = { data: null }
                    if (response.status === 201) categoriesData = await categoryApiRef.current.getAllCategory();
                    const { data } = categoriesData;
                    const categoriesList = data || categories
                    modelRecipe.categoryId = categoriesList.find(cate => cate.name_category.toLowerCase().includes(category.toLowerCase())).id;
                    modelRecipe.userId = user.id;
                    modelRecipe.name_recipe = refOneStep.current.querySelector('div input#name_recipe').value;
                    modelRecipe.time = Number(refOneStep.current.querySelector('div input#time').value);
                    modelRecipe.portion = Number(refOneStep.current.querySelector('div input#portion').value);

                    if (modelRecipe.categoryId && modelRecipe.userId && modelRecipe.name_recipe && modelRecipe.time && modelRecipe.portion) {
                        localStorage.setItem("recipe", JSON.stringify(modelRecipe));
                        setStep(2)
                    } else {
                        setModalMenssage("Preencha todos os campos")
                        setModalSuccessOpen(true)
                    }
                }
            }
            else if (step === 2) {
                modelRecipe.ing = ingredients;
                modelRecipe.prepareMode = refTwoStep.current.querySelector('textArea#prepare-mode').value;

                if (!!modelRecipe.ing.length && modelRecipe.prepareMode) {
                    localStorage.setItem("recipe", JSON.stringify(modelRecipe))
                    setStep(3)
                } else {
                    setModalMenssage("Preencha todos os campos")
                    setModalSuccessOpen(true)
                }
            } else if (step === 3) {
                modelRecipe.word_key = wordKey;
                modelRecipe.images_recipe = images;
                modelRecipe.videos_recipe = [];

                if (!!modelRecipe.word_key && !!images.length) {
                    const data = await recipeApiRef.current.createNewRecipe(modelRecipe)
                    if (data) {
                        setModalSuccessOpen(true)
                        setModalMenssage("Receita criada com sucesso")
                        navigate('/')
                    }
                } else {
                    setModalMenssage("Preencha todos os campos")
                    setModalSuccessOpen(true)
                }
            }
        }

        if (e.target.id === "previous" && step > 1) setStep(v => v - 1);



    }

    const handleAlreadyCreatedRecipe = () => {
        const recipe = JSON.parse(localStorage.getItem('recipe'));

        refOneStep.current.querySelector('div input#name_recipe').value = recipe.name_recipe;
        refOneStep.current.querySelector('div input#time').value = recipe.time;
        refOneStep.current.querySelector('div input#portion').value = recipe.portion;
        refOneStep.current.querySelector('div input#category').value = categories.find(category => category.id.includes(recipe.categoryId)).name_category
        refTwoStep.current.querySelector('textArea#prepare-mode').value = recipe.prepareMode;

        setHasRecipeReady('');  //close modal
    }

    return (
        <main className="w-10/12 bg-white mx-auto flex flex-col items-center p-16">
            <h2 className="text-s2_5 text-center pb-8 font-semibold text-color_primary">Vamos criar uma receita?</h2>
            <div className="w-full flex justify-center gap-12 my-8">
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full relative ${step >= 1 && "bg-color_primary text-white "}`}>
                    <MdImportContacts className="text-s1_5 z-10" />
                    <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                </span>
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full relative ${step >= 2 ? "bg-color_primary text-white" : "bg-white"}`}>
                    <MdList className="text-s1_5 " />
                    <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                </span>
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 3 ? "bg-color_primary text-white" : "bg-white"}`}>
                    <MdImage className="text-s1_5 " />
                </span>
            </div>
            <form className="w-4/5 flex flex-col items-center gap-y-6">
                <div ref={refOneStep} className={`w-full flex-col justify-center items-center ${step === 1 ? "flex" : "hidden"}`}>
                    <StepOneCreateRecipe categories={categories}/>
                </div>
                <div ref={refTwoStep} className={`w-full flex-col justify-center items-center ${step === 2 ? "flex" : "hidden"}`}>
                    <StepTwoCreateRecipe />
                </div>
                <div ref={refThreeStep} className={`w-full flex-col justify-center items-center ${step === 3 ? "flex" : "hidden"}`}>
                    <StepThreeCreateRecipe
                        images={images}
                        setImages={setImages}
                    />
                </div>

                <div className="flex">
                    {step > 1 && <Button
                        id="previous"
                        customClass="btn-primary px-8 mx-8"
                        event={handleNextButton}
                    ><FaArrowLeft /> Voltar</Button>}
                    <Button
                        id="next"
                        customClass="btn-primary px-8 mx-8"
                        event={handleNextButton}
                    >Proxímo <FaArrowRight /></Button>
                </div>
            </form>

            {modalSuccessOpen &&
                <BoxMenssage
                    setOpen={setModalSuccessOpen}
                    menssage={modalMenssage}
                />
            }

            {
                hasRecipeReady && step === 1 && <div className="flex flex-col justify-center items-center fixed right-32 w-1/5 bg-orange-500 p-4 rounded-2xl overflow-hidden">
                    <FaWindowClose
                        className="absolute right-0 top-0 fill-red-800 text-s1_5 cursor-pointer"
                        onClick={() => setHasRecipeReady('')}
                    />
                    <p className="text-white font-semibold text-center text-s1_3">Voce já tem uma receita salva, deseja continuar editando?</p>
                    <div className="flex w-full justify-between">
                        <Button event={handleAlreadyCreatedRecipe} customClass="btn-second mt-4 px-8">Ok</Button>
                        <Button event={() => { setHasRecipeReady(''); localStorage.removeItem('recipe') }} customClass="underline text-white mt-4 px-4">descartar</Button>
                    </div>
                </div>
            }

        </main>
    )
}