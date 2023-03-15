import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategoryApi } from "../../../hooks/useApi";
import { Input } from "../../atoms/Input";


export const StepOneCreateRecipe = () => {
    const categoryApi = useRef(useCategoryApi());
    const valueLimitsizeTittle = 45
    const refInputNameRecipe = useRef(null);
    const refInputCategory = useRef(null)
    const [qs] = useSearchParams();
    const [valueInputCategory, setValueInputCategory] = useState('')
    const [limitSizeTittle, setLimitSizeTittle] = useState(valueLimitsizeTittle);
    const [categories, setCategories] = useState([]);
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

    useEffect(() => {
        (async () => {
            const categories = await categoryApi.current.getAllCategory();
            setCategories(categories.data)
        })();
    }, []);

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
                icon={<h2 className={`text-s1_3 ${limitSizeTittle < 0 && 'text-red-500'}`}>{limitSizeTittle}</h2>}
            />

            <div className="w-[51%]">
                <Input
                    id="time"
                    label="Quantos minutos para preparar sua receita?"
                    placeholder="ex.: 10 minutos"
                    size={2}
                    type={'number'}
                    min={0}
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
                    ref={refInputCategory}
                    onChange={(e) => setValueInputCategory(e.target.value)}
                    placeholder="ex.: Bolos e doces"
                    label="Digite o nome da categoria da receita:"
                    size={4}
                />
                {valueInputCategory &&
                    <ul>
                        {filteredCategory.map(category =>
                            <li key={category.id} 
                                onClick={(e) => handleSelectedCategory(category, e)}
                                className="w-1/2 cursor-pointer mx-auto text-center hover:bg-[#24242440] bg-background border-b-[1px] m-2 text-s1_2 p-2"
                            >{category.name_category}</li>

                        )}
                    </ul>
                }
            </div>
        </>
    )
}