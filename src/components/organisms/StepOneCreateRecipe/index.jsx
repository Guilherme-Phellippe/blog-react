import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from "../../atoms/Input";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "../../atoms/Button";
import { useCategoryApi } from "../../../hooks/useApi";
import { dialog } from "../../../modals/Dialog";


const createRecipeFormSchema = z.object({
    name_recipe: z.string().nonempty("Digite o nome da sua receita!").min(5, "Nome da sua receita precisa ter no minimo 5 caracteres")
        .max(45, "Nome da sua receita precisa ter no maximo 45 caracteres")
        .transform(name => name.charAt(0).toUpperCase().concat(name.substring(1).toLowerCase())),
    time: z.coerce.number().min(1, "Sua receita precisa ter pelo menos 1 minuto de preparo"),
    portion: z.coerce.number().min(1, "Sua receita precisa render pelo menos 1 porção"),
    category: z.string().nonempty("Sua receita precisa ser vinculada a uma categoria")
        .transform(name => name.charAt(0).toUpperCase().concat(name.substring(1).toLowerCase()))
});

export const StepOneCreateRecipe = ({ categories, setStep, user }) => {
    const VALUE_LIMIT_SIZE_TITLE = 45
    const categoryApi = useCategoryApi()
    const { register, setValue, handleSubmit, formState: { errors } } = useForm(({ resolver: zodResolver(createRecipeFormSchema) }));
    const [limitSizeTittle, setLimitSizeTittle] = useState(VALUE_LIMIT_SIZE_TITLE);
    const [valueInputCategory, setValueInputCategory] = useState("")
    const [suggestionInputCategory, setSuggestionInputCategory] = useState('')
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [qs] = useSearchParams();
    const refInputNameRecipe = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const recipe = JSON.parse(localStorage.getItem('recipe'));
        if (recipe) {
            setValueInputCategory(recipe.category)
            setValue("name_recipe", recipe.name_recipe)
            setValue("time", recipe.time)
            setValue("portion", recipe.portion)
            setValue("category", recipe.category)
        }
    }, [setValue])

    useEffect(() => {
        if (qs.get('n')) {
            setLimitSizeTittle(VALUE_LIMIT_SIZE_TITLE - qs.get('n').length)
            setValue("name_recipe", qs.get('n'))
        }
    }, [qs, setValue]);

    useEffect(() => {
        (async ()=>{
            const errorsArray = Object.values(errors);
            if (!!errorsArray.length) await dialog(errorsArray[0]?.message || "Erro interno no formulario, já estamos reparando!", 0)
        })()
    }, [errors]);

    const handleDefineLimitSizeTitle = ({ target }) => {
        setLimitSizeTittle(VALUE_LIMIT_SIZE_TITLE - target.value.length);
        setValue("name_recipe", target.value)
    }


    const handleInputCategory = ({ target }) => {
        setShowSuggestion(true)
        const text = target.value.replace(/[0-9]/g, '');
        setValueInputCategory(text)

        const categorySelected = categories.filter(cat =>
            cat.name_category
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '')
                .includes(text.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLowerCase()));
        
        categorySelected.sort((x, y) => y.recipe - x.recipe)

        if (!categorySelected.length) setSuggestionInputCategory(text)
        else setSuggestionInputCategory(categorySelected[0].name_category)
    }

    const onSubmit = async (data) => {
        if(user){
            data.category = suggestionInputCategory.length ? suggestionInputCategory : data.category;
            const response = await categoryApi.createNewCategory(data.category);
            if (response.status === 200 || response.status === 201) {
                const user = JSON.parse(localStorage.getItem("token"))
                data.userId = user.id
                data.categoryId = response.data.id
                localStorage.setItem("recipe", JSON.stringify(data));
                setStep(step => step + 1)
            }

        }else{
            const response = await dialog("Você precisa criar uma conta antes de prosseguir!", 0, "Criar conta")
            if(response) navigate('/register')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`w-full flex flex-col justify-center items-center py-8`}>
            <Input
                ref={refInputNameRecipe}
                label="Nome da sua receita"
                placeholder="ex.: Bolo de cenoura"
                id="name_recipe"
                customWidthAndMargin="w-[95%] md:w-[51%] my-6"
                icon={<h2 className={`text-s1_3 ${limitSizeTittle < 0 || limitSizeTittle > 40 ? 'text-red-500' : ''}`}>{limitSizeTittle}</h2>}
                {...register("name_recipe")}
                onChange={handleDefineLimitSizeTitle}
            />

            <div className="w-[95%] md:w-[51%] mt-6">
                <Input
                    id="time"
                    label="Quantos minutos para preparar sua receita?"
                    placeholder="ex.: 10 minutos"
                    customWidthAndMargin="w-[100%] my-6"
                    type={'number'}
                    min={0}
                    {...register("time")}
                />
            </div>
            <div className="w-[95%] md:w-[51%] mt-6">
                <Input
                    id="portion"
                    label="Quantas porções ela rende?"
                    placeholder="ex.: 5 porções"
                    customWidthAndMargin="w-[100%] my-6"
                    type={'number'}
                    {...register("portion")}
                />
            </div>
            <div className="w-[95%] md:w-[51%] flex-col mt-6">
                <Input
                    placeholder="ex.: Bolos e doces"
                    label="Digite o nome da categoria que mais se encaixa na sua receita"
                    customWidthAndMargin="w-[100%] my-6"
                    autoComplete="off"
                    value={valueInputCategory}
                    {...register("category", { onChange: handleInputCategory })}
                />

                {
                    showSuggestion &&
                    <div className="flex justify-center bg-background p-4 my-8 relative">
                        <div className="flex w-full justify-center text-s1_3 items-center gap-4">
                            <p className="w-1/5">Sugestão:</p>
                            <h2 className="w-3/5">{suggestionInputCategory}</h2>
                            <Button type="button" className="btn-second" event={() => {setValueInputCategory(suggestionInputCategory); setShowSuggestion(false)}}>Selecionar</Button>
                        </div>
                    </div>
                }

            </div>


            <Button customClass="btn-primary text-s1_2 py-3 px-8 mx-8">
                Proxímo <FaArrowRight />
            </Button>
        </form>
    )
}