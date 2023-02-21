import { useRef, useState } from "react"

import { FaPlusCircle } from "react-icons/fa"
import { MdRemoveCircle } from "react-icons/md"

import { Input } from "../../atoms/Input"
import { TextArea } from "../../atoms/TextArea"

export const StepTwoCreateRecipe = () => {
    const [listIngredients, setListIngredients] = useState([])
    const refInputIngredients = useRef(null)

    const handleAddListIngredients = () => {
        const value = refInputIngredients.current.value
        !!value.length ? setListIngredients(v => [...v, value]) : alert("Digite o ingrediente")
        refInputIngredients.current.value = ''
        refInputIngredients.current.focus()
    }

    const handleRemoveListIngredients = ({ currentTarget }) =>{
        const li = currentTarget.closest('li').querySelector('p').textContent;
        const index = listIngredients.indexOf(li);
        listIngredients.splice(index, 1)
        setListIngredients(() => [...listIngredients])
    }

    return (
        <>
            
            <div className="w-1/2 my-8 flex flex-col items-center">
                <h2 className="text-s1_5 text-color_primary p-4 mb-4 font-bold">Quais são os ingredientes?</h2>
                {!!listIngredients.length && <div className="flex flex-col">
                    <ul id="ing">
                        {listIngredients.map((list, index) =>
                            <li
                                className="text-s1_3 flex items-center justify-between gap-4"
                                key={index}
                            ><p>{list}</p><MdRemoveCircle
                                    className="text-s1_5 cursor-pointer fill-red-500 hover:fill-red-800" 
                                    onClick={handleRemoveListIngredients}
                                    /></li>
                        )
                        }
                    </ul>
                </div>}
                <div className="flex w-full">
                    <Input
                        ref={refInputIngredients}
                        placeholder="Digite o ingrediente"
                        size={4}
                        icon={<FaPlusCircle
                            className="text-s1_7 fill-green-500 cursor-pointer"
                            onClick={handleAddListIngredients}
                        />
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col w-1/2 h-[20rem]">
                <TextArea
                id="prepare-mode"
                    placeholder="ex.: em uma panela coloque...."
                    label="Descreva como preparar sua receita:"
                />
            </div>
        </>
    )
}