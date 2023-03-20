import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../atoms/Input";


export const StepOneCreateRecipe = ({ categories }) => {
    const valueLimitsizeTittle = 45
    const refInputNameRecipe = useRef(null);
    const refInputCategory = useRef(null)
    const [qs] = useSearchParams();
    const [valueInputCategory, setValueInputCategory] = useState('')
    const [limitSizeTittle, setLimitSizeTittle] = useState(valueLimitsizeTittle);
    const filteredCategory = categories.filter(category =>
        category.name_category.toLowerCase().includes(valueInputCategory.toLowerCase())
        &&
        category.suggestion >= 3
    )


    useEffect(() => {
        if (qs.get('n')) {
            setLimitSizeTittle(valueLimitsizeTittle - qs.get('n').length)
            refInputNameRecipe.current.value = qs.get("n")
        }
    }, [qs]);

    const handleSelectedCategory = (category, e) =>{
        setValueInputCategory(category.name_category)
        refInputCategory.current.value = category.name_category
        e.target.classList.add("hidden")
    }

    return (
        <>
            <Input
                ref={refInputNameRecipe}
                onChange={(e) => setLimitSizeTittle(valueLimitsizeTittle - e.target.value.length)}
                label="Nome da sua receita"
                placeholder="ex.: Bolo de cenoura"
                id="name_recipe"
                customWidthAndMargin="w-[51%] my-6"
                icon={<h2 className={`text-s1_3 ${limitSizeTittle < 0 && 'text-red-500'}`}>{limitSizeTittle}</h2>}
            />

            <div className="w-[51%]">
                <Input
                    id="time"
                    label="Quantos minutos para preparar sua receita?"
                    placeholder="ex.: 10 minutos"
                    customWidthAndMargin="w-[100%] my-6"
                    type={'number'}
                    min={0}
                />
            </div>
            <div className="w-[51%]">
                <Input
                    id="portion"
                    label="Quantas porções ela rende?"
                    placeholder="ex.: 5 porções"
                    customWidthAndMargin="w-[100%] my-6"
                    type={'number'}
                />
            </div>
            <div className="w-[51%] flex-col">
                <Input
                    id="category"
                    ref={refInputCategory}
                    onChange={(e) => setValueInputCategory(e.target.value)}
                    placeholder="ex.: Bolos e doces"
                    label="Digite o nome da categoria da receita:"
                    customWidthAndMargin="w-[100%] my-6"
                />
                {valueInputCategory &&
                    <ul>
                        {filteredCategory.map(category =>
                            <li key={category.id} 
                                onClick={(e) => handleSelectedCategory(category, e)}
                                className="w-full cursor-pointer mx-auto hover:bg-[#24242440] bg-background border-b-[1px] text-s1_2 p-4"
                            >{category.name_category}</li>

                        )}
                    </ul>
                }
            </div>
        </>
    )
}