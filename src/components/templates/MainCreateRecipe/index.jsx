import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

import categories from "../../../scripts/api/categories"

import { Button } from "../../atoms/Button"
import { Input } from "../../atoms/Input"

export const MainCreateRecipe = () => {
    const valueLimitsizeTittle = 45
    const [qs] = useSearchParams();
    const refTextArea = useRef(null);
    const [limitSizeTittle, setLimitSizeTittle] = useState(valueLimitsizeTittle);
    const [titleRecipe, setTitleRecipe] = useState('')
    const [step, setStep] = useState(1)
    const [isOpenSelectCategory, setIsOpenSelectCategory] = useState(false)
    const [valueInputCategory, setValueInputCategory] = useState('')
    const filteredCategory = categories.filter(category =>
        category.name_category.toLowerCase().includes(valueInputCategory.toLowerCase()))

    useEffect(() => {
        if (qs.get('n')) {
            setLimitSizeTittle(valueLimitsizeTittle - qs.get('n').length)
            setTitleRecipe(qs.get("n"));
            refTextArea.current.focus()
        }
    }, [qs])

    const handleNextButton = (e) => {
        e.preventDefault()
        if (e.target.id === "next" && step <= 3) setStep(v => v + 1)
        if (e.target.id === "previous" && step > 1) setStep(v => v - 1)
    }


    return (
        <main className="w-10/12 bg-white mx-auto flex flex-col items-center">
            <h2 className="text-s2 text-center py-8">Vamos criar uma receita?</h2>
            <div className="w-full flex justify-center gap-12 my-8">
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 1 && "bg-color_primary text-white "}`}>1</span>
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step >= 2 && "bg-color_primary text-white"}`}>2</span>
                <span className={`py-3 px-4 border-[1px] border-solid border-color_primary rounded-full ${step > 3 && "bg-color_primary text-white"}`}>3</span>
            </div>
            <form className="w-4/5 flex flex-col items-center gap-y-6">
                <div className={`w-full flex-col justify-center items-center ${step === 1 ? "flex" : "hidden"}`}>
                    <Input
                        onChange={(e) => setLimitSizeTittle(valueLimitsizeTittle - e.target.value.length)}
                        placeholder="Nome da sua receita"
                        value={titleRecipe}
                        icon={<h2 className={`text-s1_3 ${limitSizeTittle < 0 && 'text-red-500'}`}>{limitSizeTittle}</h2>}
                    />
                    <textarea
                        ref={refTextArea}
                        className="w-[51%] p-4 bg-background resize-none outline-none text-s1_2 rounded-xl m-2"
                        name=""
                        id=""
                        cols="50"
                        rows="5"
                        placeholder="Digite a descrição da sua receita"
                    ></textarea>
                    <div className="w-[51%]">
                        <Input
                            placeholder="Quantos minutos leva para preparar sua receita?"
                            size={2}
                            type={'number'}
                        />
                    </div>
                    <div className="w-[51%]">
                        <Input
                            placeholder="Quantas porções ela rende?"
                            size={2}
                            type={'number'}
                        />
                    </div>
                    <div className="w-[51%] flex-col">
                        <Input
                            onChange={(e) => setValueInputCategory(e.target.value)}
                            placeholder="Digite o nome da categoria da receita:"
                            size={4}
                            value={valueInputCategory}
                            icon={<h2 className={`cursor-pointer bg-color_primary h-full text-center text-white text-s1 items-center ${filteredCategory.length ? 'hidden' : 'flex'}`}>Sugerir categoria</h2>}
                        />
                        {valueInputCategory &&
                            <ul>
                                {filteredCategory.map(category =>
                                    <li onClick={
                                        (e) => { setValueInputCategory(category.name_category); e.target.classList.add("hidden") }}
                                        className="w-1/2 cursor-pointer mx-auto text-center hover:bg-[#24242440] bg-background border-b-[1px] m-2 text-s1_2 p-2"
                                    >{category.name_category}</li>)
                                }
                            </ul>
                        }
                        {isOpenSelectCategory ?
                            <div className="flex flex-col">
                                <select className="p-4 w-[50%] m-2 text-s1_2 text-center cursor-pointer">
                                    {categories.map(category =>
                                        <option
                                            className="text-s1_2 text-center cursor-pointer"
                                            key={category.id}
                                            value={category.name_category}
                                        >{category.name_category}</option>)}

                                </select>
                            </div>
                            : <Button event={(e) => { e.preventDefault(); setIsOpenSelectCategory(true) }}> Adicionar mais categoria </Button>
                        }
                    </div>
                </div>
                <div className={`w-full flex-col justify-center items-center ${step === 2 ? "flex" : "hidden"}`}>
                    <label forHtml="file" className="w-1/2 h-[10rem] cursor-pointer border-2 border-dotted border-color_primary flex justify-center items-center">
                        <h2 className="text-s1_3 text-gray-500">Envie as imagens da receita</h2>
                        <input type="file" name="" id="file" className="hidden"/>
                    </label>
                </div>

                <div className="flex">
                    <Button id="previous" event={handleNextButton}>Voltar</Button>
                    <Button id="next" event={handleNextButton}>Proxímo</Button>
                </div>
            </form>
        </main>
    )
}