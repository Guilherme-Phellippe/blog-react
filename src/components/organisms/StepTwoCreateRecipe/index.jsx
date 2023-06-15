import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

import { Input } from "../../atoms/Input"
import { TextArea } from "../../atoms/TextArea"
import { Button } from "../../atoms/Button"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectTypeIng from "../../atoms/SelectTypeIng"

const schema = z.object({
    ing: z.array(z.object({
        value: z.string().nonempty("Digite o ingredinte da sua receita")
    })).min(1, "Sua receita precisa ter no minimo um ingrediente"),
    stuffing_ing: z.array(z.object({
        type: z.string(),
        value: z.string().nonempty("Digite o ingredinte do seu recheio, caso não tenha recheio, remova o recheio da sua receita")
    })),
    prepareMode: z.array(z.object({
        type: z.string(),
        value: z.string().nonempty("Digite o modo de preparo da sua receita")
    })).min(1, "Sua receita precisa ter no minimo um passo no modo de preparo"),
})


export const StepTwoCreateRecipe = ({ setStep }) => {
    const storage = JSON.parse(localStorage.getItem("recipe"));

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm(
        {
            resolver: zodResolver(schema),
            defaultValues: {
                ing: storage.ing ? storage.ing.map(item => {
                    return {
                        value: item.value
                    }
                }) : [{ value: '' }],
                prepareMode: storage.prepareMode ? storage.prepareMode.split("<step>").map(item => {
                    return { type: item.type, value: item.type }
                }) : [{ type: 'Principal', value: '' }]
            }
        }
    );

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ing',
    });

    const { fields: stuffingField, append: stuffingAppend, remove: stuffingRemove } = useFieldArray({
        control,
        name: 'stuffing_ing',
    });

    const { fields: prepareField, append: prepareAppend, remove: prepareRemove } = useFieldArray({
        control,
        name: 'prepareMode',
    });

    const onSubmit = (data) => {
        const dataRecipe = JSON.parse(localStorage.getItem('recipe'));
        if (dataRecipe) {
            dataRecipe.ing = data.ing.map(obj => obj.value)
            dataRecipe.stuffing_ing = data.stuffing_ing.map(obj => obj.value)
            dataRecipe.type_stuffing_ing = data.stuffing_ing.map(obj => obj.type)
            dataRecipe.prepareMode = data.prepareMode.map((mode, index) => {
                const isLastItem = index === (data.prepareMode.length - 1)
                return isLastItem ? mode.value : `${mode.value}<step>`
            }).join('')
            dataRecipe.type_prepare_mode = data.prepareMode.map((mode) => mode.type)
            localStorage.setItem("recipe", JSON.stringify(dataRecipe))
            setStep(3)
        } else alert("Tivemos um problema na criação de sua receita")
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full flex flex-col justify-center items-center`}
        >
            <div className="w-full md:w-2/3 my-8 flex flex-col items-center">

                <h2 className="text-s1_7 md:text-s1_7 text-color_orange p-4 font-bold">Quais são os ingredientes?</h2>

                <div className="flex flex-col w-full my-8">
                    {
                        fields.map((field, index) =>
                            <div key={field.id} className="flex flex-col items-start">
                                <div className="w-full flex justify-between items-center">
                                    <select className="cursor-pointer p-4 text-s1_2 text-center text-color_text_black rounded-xl mx-4">
                                        <option value="Principal">Principal</option>
                                    </select>
                                    {errors.ing?.[index]?.type && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.ing[index].type.message}</span>}
                                    <Input
                                        placeholder={`Digite o ${index + 1}° ingrediente`}
                                        customWidthAndMargin="w-[95%] my-6"
                                        onKeyDown={(e) => { if (e.code === "Enter") { e.preventDefault(); append({ value: '' }) } }}
                                        autoFocus
                                        icon={<MdRemoveCircle
                                            className="text-s1_7 fill-red-700 cursor-pointer"
                                            onClick={() => { index > 0 && remove(index) }} />
                                        }
                                        {...register(`ing.${index}.value`)}
                                    />
                                    <MdAddCircle
                                        onClick={() => append({ value: '' })}
                                        className="text-s3 mx-4 fill-green-700 cursor-pointer" />
                                </div>
                                {errors.ing?.[index]?.value && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.ing[index].value.message}</span>}
                            </div>
                        )
                    }
                    {errors.ing && <span className={`text-s1_2 text-center text-red-700 ${!fields.length && 'bg-red-500/20 p-2'} `}>{errors.ing.message}</span>}
                </div>


                <div className="w-full flex flex-col">
                    {
                        !!stuffingField.length &&
                        <h2 className="text-s1_5 text-color_orange p-4 mb-4 font-bold">Quais são os ingredientes adicionais?</h2>
                    }
                    {
                        stuffingField.map((field, index) =>
                            <div key={field.id} className="w-full flex flex-col">
                                <div className="w-full flex justify-between items-center">
                                    <SelectTypeIng
                                        disabledMain={true}
                                        register={register}
                                        index={index}
                                        table={"stuffing_ing"}
                                    />
                                    {errors.stuffing_ing?.[index]?.type && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.stuffing_ing[index].type.message}</span>}
                                    <Input
                                        placeholder={`Digite o ${index + 1}° ingrediente do recheio`}
                                        customWidthAndMargin="w-[90%] my-6"
                                        onKeyDown={(e) => { if (e.code === "Enter") { e.preventDefault(); stuffingAppend({ value: '' }) } }}
                                        icon={<MdRemoveCircle
                                            className="text-s1_7 fill-red-700 cursor-pointer"
                                            onClick={() => stuffingRemove(index)} />
                                        }
                                        {...register(`stuffing_ing.${index}.value`)}
                                    />
                                    <MdAddCircle
                                        onClick={() => stuffingAppend({ value: '' })}
                                        className="text-s2_5 ml-4 fill-green-700 cursor-pointer" />
                                </div>
                                {errors.stuffing_ing?.[index]?.value && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.stuffing_ing?.[index]?.value.message}</span>}
                            </div>
                        )

                    }
                </div>

                <div className="flex items-center gap-4" >
                    {
                        !stuffingField.length ?
                            <Button type="button" event={() => stuffingAppend({ type: 'Acompanhamento', value: '' })} customClass="btn-primary text-s1_2 py-3 px-6">
                                <MdAddCircle /> Criar recheio
                            </Button>
                            :
                            <Button type="button" event={() => reset({ stuffing_ing: [] })} customClass="btn-second bg-red-700 text-s1_2 my-8 py-3 px-6">
                                <MdRemoveCircle />  Remover recheio
                            </Button>

                    }
                </div>

            </div>





            <div className="flex flex-col items-center w-full md:w-1/2 mt-8">
                <h2 className="text-s1_7 md:text-s1_5 text-color_orange font-bold">Como é modo de preparo?</h2>

                <div className="flex-col w-full h-full">
                    {
                        prepareField.map((step, index) =>
                            <div key={index} className="w-full flex flex-col justify-center">
                                <div className="flex my-6">
                                    <SelectTypeIng
                                        register={register}
                                        index={index}
                                        table={"prepareMode"}
                                    />
                                    {errors.prepareMode?.[index]?.type && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.prepareMode[index].type.message}</span>}
                                    <span className="flex justify-center items-center w-2/12 text-s1_4 text-center text-color_orange ">
                                        Passo {index + 1}:
                                    </span>
                                </div>
                                <div className="flex w-full items-center">
                                    <TextArea
                                        onKeyDown={(e) => { if (e.code === "Enter") { e.preventDefault(); prepareAppend({ value: '' }) } }}
                                        placeholder={`ex.: esse é o passo ${index + 1}`}
                                        autoFocus
                                        {...register(`prepareMode.${index}.value`)}
                                    />

                                    <div className="h-full flex flex-col justify-between items-center">
                                        <MdRemoveCircle
                                            onClick={() => { index > 0 && prepareRemove(index) }}
                                            className="text-s2_5 fill-red-800 hover:fill-red-500 cursor-pointer ml-4 mb-4" />
                                        <MdAddCircle
                                            onClick={() => prepareAppend({ value: '' })}
                                            className="text-s2_5 fill-green-700 hover:fill-green-500 cursor-pointer ml-4 mt-4" />

                                    </div>
                                </div>
                                {errors.prepareMode?.[index]?.value && <span className="text-s1_1 text-red-700 bg-red-500/20 p-2">{errors.prepareMode?.[index]?.value.message}</span>}
                            </div>
                        )
                    }
                </div>
            </div>


            <div className="flex mt-8">
                <Button
                    type="button"
                    customClass="btn-primary text-s1_2 py-3 px-8 mx-8"
                    event={() => setStep(v => v - 1)}
                >
                    <FaArrowLeft /> Voltar
                </Button>
                <Button
                    type="submit"
                    customClass="btn-primary text-s1_2 py-3 px-8 mx-8"
                >
                    Proxímo <FaArrowRight />
                </Button>
            </div>
        </form>
    )
}