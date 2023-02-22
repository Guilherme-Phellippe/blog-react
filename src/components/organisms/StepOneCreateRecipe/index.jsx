import { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa"
import { useSearchParams } from "react-router-dom";
import categories from "../../../scripts/api/categories";
import { Button } from "../../atoms/Button";
import { Input } from "../../atoms/Input";
import { TextArea } from "../../atoms/TextArea";


export const StepOneCreateRecipe = () => {
    const valueLimitsizeTittle = 45
    const refTextArea = useRef(null);
    const refInputNameRecipe = useRef(null);
    const [qs] = useSearchParams();
    const [valueInputCategory, setValueInputCategory] = useState('')
    const [limitSizeTittle, setLimitSizeTittle] = useState(valueLimitsizeTittle);
    const [isOpenSelectCategory, setIsOpenSelectCategory] = useState(false)
    const filteredCategory = categories.filter(category =>
        category.name_category.toLowerCase().includes(valueInputCategory.toLowerCase()))


    useEffect(() => {
        if (qs.get('n')) {
            setLimitSizeTittle(valueLimitsizeTittle - qs.get('n').length)
            refInputNameRecipe.current.value = qs.get("n")
            refTextArea.current.focus()
        }
    }, [qs])

    return (
        <>
            <Input
                ref={refInputNameRecipe}
                onChange={(e) => setLimitSizeTittle(valueLimitsizeTittle - e.target.value.length)}
                label="Nome da sua receita"
                placeholder="ex.: Bolo de cenoura"
                id="name_recipe"
                icon={<h2 className={`text-s1_3 ${limitSizeTittle < 0 && 'text-red-500'}`}>{limitSizeTittle}</h2>}
            />
            <div className="w-1/2 mb-12 mt-4 h-[7rem]">
                <TextArea
                    id="describe_recipe"
                    ref={refTextArea}
                    label="Digite a descrição da sua receita"
                    placeholder="ex.: minha receita foi feita..."
                />
            </div>

            <div className="w-[51%]">
                <Input
                    id="time"
                    label="Quantos minutos para preparar sua receita?"
                    placeholder="ex.: 10 minutos"
                    size={2}
                    type={'number'}
                />
            </div>
            <div className="w-[51%]">
                <Input
                    id="portion"
                    label="Quantas porções ela rende?"
                    placeholder="ex.: 5 porções"
                    size={2}
                    type={'number'}
                />
            </div>
            <div className="w-[51%] flex-col">
                <Input
                    id="category"
                    onChange={(e) => setValueInputCategory(e.target.value)}
                    placeholder="ex.: Bolos e doces"
                    label="Digite o nome da categoria da receita:"
                    size={4}
                    value={valueInputCategory}
                    icon={<h2 className={`cursor-pointer bg-color_primary h-full text-center text-white text-s1 items-center ${filteredCategory.length ? 'hidden' : 'flex'}`}>Sugerir categoria</h2>}
                />
                {valueInputCategory &&
                    <ul>
                        {filteredCategory.map(category =>
                            <li key={category.id} onClick={
                                (e) => { setValueInputCategory(category.name_category); e.target.classList.add("hidden") }}
                                className="w-1/2 cursor-pointer mx-auto text-center hover:bg-[#24242440] bg-background border-b-[1px] m-2 text-s1_2 p-2"
                            >{category.name_category}</li>)
                        }
                    </ul>
                }
                {isOpenSelectCategory ?
                    <div className="flex flex-col">
                        <select id="secondCategory" className="p-4 w-full m-2 text-s1_2 text-center cursor-pointer">
                            {categories.map(category =>
                                <option
                                    className="text-s1_2 text-center cursor-pointer"
                                    key={category.id}
                                    value={category.name_category}
                                >{category.name_category}</option>)}

                        </select>
                    </div>
                    : <Button
                        event={(e) => { e.preventDefault(); setIsOpenSelectCategory(true) }}
                        customClass="btn-second mx-auto mb-8 mt-4"
                    > <FaPlusCircle /> Adicionar mais categoria </Button>
                }
            </div>
        </>
    )
}