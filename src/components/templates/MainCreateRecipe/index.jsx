import { useRef, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaWindowClose } from "react-icons/fa"
import { MdImage, MdImportContacts, MdList } from "react-icons/md"
import { BoxMenssage } from "../../../modals/BoxMenssage"
import { Button } from "../../atoms/Button"
import { StepOneCreateRecipe } from "../../organisms/StepOneCreateRecipe"
import { StepThreeCreateRecipe } from "../../organisms/StepThreeCreateRecipe"
import { StepTwoCreateRecipe } from "../../organisms/StepTwoCreateRecipe"

export const MainCreateRecipe = () => {
    const [step, setStep] = useState(1)
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false)
    const [modalMenssage, setModalMenssage] = useState('')
    const [hasRecipeReady, setHasRecipeReady] = useState(localStorage.getItem('recipe'));
    const refOneStep = useRef()
    const refTwoStep = useRef()
    const refThreeStep = useRef()

    const handleNextButton = (e) => {
        e.preventDefault()
        if (e.target.id === "next") {
            const ingredients = Array.from(refTwoStep.current.querySelectorAll('ul#ing li p')).map(p => p.textContent)
            const wordKey = Array.from(refThreeStep.current.querySelectorAll('ul#word-keys li p')).map(p => p.textContent)
            const recipeStepOne = {
                id: 11,
                idUser: 4,
                name_recipe: refOneStep.current.querySelector('div input#name_recipe').value,
                describe_recipe: refOneStep.current.querySelector('div textArea#describe_recipe').value,
                category: [refOneStep.current.querySelector('div input#category')?.value, refOneStep.current.querySelector('div select#secondCategory')?.value],
                prepare: {
                    time: refOneStep.current.querySelector('div input#time').value,
                    portion: refOneStep.current.querySelector('div input#portion').value,
                    ing: ingredients,
                    word_key: wordKey,
                    prepareMode: refTwoStep.current.querySelector('textArea#prepare-mode').value,
                },
                img: 'enviei.png',
                author: '',
                nmr_hearts: 0,
                nmr_eyes: 0,
                nmr_saved: 0,
                votes: [],
                comments: [],
                createdAt: new Date(2023, 1, 25, 18, 52, 1),

            }

            if (step === 1) {
                if (recipeStepOne.name_recipe && recipeStepOne.describe_recipe && recipeStepOne.category && recipeStepOne.prepare.time && recipeStepOne.prepare.portion) {
                    localStorage.setItem("recipe", JSON.stringify(recipeStepOne))
                    setStep(2)
                } else {
                    setModalMenssage("Preencha todos os campos")
                    setModalSuccessOpen(true)
                }
            } else if (step === 2) {
                if (!!recipeStepOne.prepare.ing.length && recipeStepOne.prepare.prepareMode) {
                    localStorage.setItem("recipe", JSON.stringify(recipeStepOne))
                    setStep(3)
                } else {
                    setModalMenssage("Preencha todos os campos")
                    setModalSuccessOpen(true)
                }
            } else if (step === 3) {
                if (!!recipeStepOne.prepare.word_key) {
                    localStorage.setItem("recipe", JSON.stringify(recipeStepOne))
                    //salva no banco de dados
                    setModalSuccessOpen(true)
                    setModalMenssage("Receita criada com sucesso")
                } else {
                    setModalMenssage("Preencha todos os campos")
                    setModalSuccessOpen(true)
                }
            }
        }

        if (e.target.id === "previous" && step > 1) setStep(v => v - 1)
    }


    return (
        <main className="w-10/12 bg-white mx-auto flex flex-col items-center p-16">
            <h2 className="text-s2_5 text-center pb-8 font-semibold text-color_primary">Vamos criar uma receita?</h2>
            <div className="w-full flex justify-center gap-12 my-8">
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full relative ${step >= 1 && "bg-color_primary text-white "}`}>
                    <MdImportContacts className="text-s1_5 z-10"/>
                    <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                </span>
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full relative ${step >= 2? "bg-color_primary text-white":"bg-white"}`}>
                    <MdList className="text-s1_5 "/>
                    <span className="absolute -z-0 left-full top-1/2 w-full h-[1px] bg-black opacity-30"></span>
                </span>
                <span className={`py-3 z-10 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 3 ? "bg-color_primary text-white":"bg-white"}`}>
                    <MdImage className="text-s1_5 " />
                </span>
            </div>
            <form className="w-4/5 flex flex-col items-center gap-y-6">
                <div ref={refOneStep} className={`w-full flex-col justify-center items-center ${step === 1 ? "flex" : "hidden"}`}>
                    <StepOneCreateRecipe />
                </div>
                <div ref={refTwoStep} className={`w-full flex-col justify-center items-center ${step === 2 ? "flex" : "hidden"}`}>
                    <StepTwoCreateRecipe />
                </div>
                <div ref={refThreeStep} className={`w-full flex-col justify-center items-center ${step === 3 ? "flex" : "hidden"}`}>
                    <StepThreeCreateRecipe />
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
                hasRecipeReady && <div className="flex flex-col justify-center items-center fixed right-32 w-1/5 bg-orange-500 p-4 rounded-2xl overflow-hidden">
                    <FaWindowClose 
                        className="absolute right-0 top-0 fill-red-800 text-s1_5 cursor-pointer"
                        onClick={()=> setHasRecipeReady('')}
                    />
                    <p className="text-white font-semibold text-center text-s1_3">Voce já tem uma receita salva, deseja continuar editando?</p>
                    <div className="flex w-full justify-between">
                        <Button customClass="btn-second mt-4 px-8">Ok</Button>
                        <Button event={()=> {setHasRecipeReady(''); localStorage.removeItem('recipe')}} customClass="underline text-white mt-4 px-4">descartar</Button>
                    </div>
                </div>
            }

        </main>
    )
}