import { useRef, useState } from "react"
import { BoxMenssage } from "../../../modals/BoxMenssage"
import { Button } from "../../atoms/Button"
import { StepOneCreateRecipe } from "../../organisms/StepOneCreateRecipe"
import { StepThreeCreateRecipe } from "../../organisms/StepThreeCreateRecipe"
import { StepTwoCreateRecipe } from "../../organisms/StepTwoCreateRecipe"

export const MainCreateRecipe = () => {
    const [step, setStep] = useState(1)
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false)
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
                } else alert("preencha todos os campos!")
            } else if (step === 2) {
                if (!!recipeStepOne.prepare.ing.length && recipeStepOne.prepare.prepareMode) {
                    localStorage.setItem("recipe", JSON.stringify(recipeStepOne))
                    setStep(3)
                } else alert("preencha todos os campos!")
            } else if (step === 3) {
                if (!!recipeStepOne.prepare.word_key) {
                    localStorage.setItem("recipe", JSON.stringify(recipeStepOne))
                    //salva no banco de dados
                    setModalSuccessOpen(true)
                } else alert("preencha todos os campos!")
            }
        }

        if (e.target.id === "previous" && step > 1) setStep(v => v - 1)
    }


    return (
        <main className="w-10/12 bg-white mx-auto flex flex-col items-center">
            <h2 className="text-s2 text-center py-8">Vamos criar uma receita?</h2>
            <div className="w-full flex justify-center gap-12 my-8">
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 1 && "bg-color_primary text-white "}`}>1</span>
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 2 && "bg-color_primary text-white"}`}>2</span>
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 3 && "bg-color_primary text-white"}`}>3</span>
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
                    <Button id="previous" event={handleNextButton}>Voltar</Button>
                    <Button id="next" event={handleNextButton}>Proxímo</Button>
                </div>
            </form>

            {modalSuccessOpen &&
                <BoxMenssage
                    setOpen={setModalSuccessOpen}
                    menssage="Receita criada com sucesso"
                />}

        </main>
    )
}