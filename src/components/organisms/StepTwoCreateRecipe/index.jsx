import { useRef, useState } from "react"

import { FaPlusCircle } from "react-icons/fa"
import { MdAddCircle, MdRemoveCircle } from "react-icons/md"

import { Input } from "../../atoms/Input"
import { TextArea } from "../../atoms/TextArea"
import { Button } from "../../atoms/Button"

export const StepTwoCreateRecipe = () => {
    const [listIngredients, setListIngredients] = useState([])
    const [newListIngredients, setNewListIngredients] = useState([])
    const [showNewListInredients, setShowNewListIngredients] = useState(false)
    const refInputIngredients = useRef(null)
    const refInputNewIngredients = useRef(null)

    const handleAddListIngredients = () => {
        const value = refInputIngredients.current.value
        !!value.length ? setListIngredients(v => [...v, value]) : alert("Digite o ingrediente")
        refInputIngredients.current.value = ''
        refInputIngredients.current.focus()
    }

    const handleRemoveListIngredients = ({ currentTarget }) => {
        const li = currentTarget.closest('li').querySelector('p').textContent;
        const index = listIngredients.indexOf(li);
        listIngredients.splice(index, 1)
        setListIngredients(() => [...listIngredients])
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddListIngredients()
        }
    }


    const handleCreateNewListIngredients = (e) => {
        e.preventDefault()
        setNewListIngredients([])
        setShowNewListIngredients(v => !v)
    }

    const handleAddNewListIngredients = () => {
        const value = refInputNewIngredients.current.value
        !!value.length ? setNewListIngredients(v => [...v, value]) : alert("Digite o ingrediente")
        refInputNewIngredients.current.value = ''
        refInputNewIngredients.current.focus()
    }

    const handleRemoveNewListIngredients = ({ currentTarget }) => {
        const li = currentTarget.closest('li').querySelector('p').textContent;
        const index = newListIngredients.indexOf(li);
        newListIngredients.splice(index, 1)
        setNewListIngredients(() => [...newListIngredients])
    }

    const handleKeyDownNewList = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddNewListIngredients()
        }
    }

    return (
        <>
            <div className="w-full md:w-1/2 my-8 flex flex-col items-center">
                <h2 className="text-s1_5 text-color_primary p-4 mb-4 font-bold">Quais são os ingredientes?</h2>
                {!!listIngredients.length && <div className="flex flex-col">
                    <ul id="ing" className="border-[1px] border-color_primary/30 px-6 pt-6 mb-4 rounded-2xl min-w-[200px]">
                        {listIngredients.map((list, index) =>
                            <li
                                className="text-s1_3 flex items-center mb-4 justify-between gap-4"
                                key={index}
                            ><span>{index+1}°-</span><p>{list}</p><MdRemoveCircle
                                    className="text-s1_5 cursor-pointer fill-red-500 hover:fill-red-800"
                                    onClick={handleRemoveListIngredients}
                                /></li>
                        )
                        }
                    </ul>
                </div>}
                <div className="flex w-full my-8">
                    <Input
                        ref={refInputIngredients}
                        placeholder="Digite o ingrediente"
                        label="Digite o ingrediente e clique no botão adicionar ao lado"
                        customWidthAndMargin="w-[100%] my-6"
                        onKeyDown={handleKeyDown}
                        icon={<FaPlusCircle
                            className="text-s1_7 fill-green-500 cursor-pointer"
                            onClick={handleAddListIngredients}
                        />
                        }
                    />
                </div>

                {(!!newListIngredients.length && showNewListInredients )&& <div className="flex flex-col">
                    <ul id="new-ing" className="border-[1px] border-color_primary/30 px-6 pt-6 mb-4 rounded-2xl min-w-[200px]">
                        {newListIngredients.map((list, index) =>
                            <li
                                className="text-s1_3 flex items-center justify-between gap-4 mb-4"
                                key={index}
                            ><span>{index+1}°-</span> <p>{list}</p><MdRemoveCircle
                                    className="text-s1_5 cursor-pointer fill-red-500 hover:fill-red-800"
                                    onClick={handleRemoveNewListIngredients}
                                /></li>
                        )
                        }
                    </ul>
                </div>}


                {
                    showNewListInredients &&


                    <div className="flex flex-col w-full my-8">
                        <Input
                            ref={refInputNewIngredients}
                            placeholder="Digite o ingrediente"
                            label="Adicione o ingrediente e clique no botão ao lado"
                            customWidthAndMargin="w-[100%] my-6"
                            onKeyDown={handleKeyDownNewList}
                            icon={<FaPlusCircle
                                className="text-s1_7 fill-green-500 cursor-pointer"
                                onClick={handleAddNewListIngredients}
                            />
                            }
                        />
                    </div>
                }


                <div className="flex flex-col items-center gap-4">
                    {
                        !showNewListInredients &&
                        <h3 className="text-center text-s1_2">Sua receita tem ingredientes á parte? <br /> <span className="text-center text-s1_1">(ex: recheio, cobertura...)</span></h3>
                    }
                    <Button event={handleCreateNewListIngredients} customClass="btn-primary text-s1_1 py-3 px-6">
                        {showNewListInredients ? <MdRemoveCircle /> : <MdAddCircle />}
                        {showNewListInredients ? "Remover lista" : "Adicionar ingredientes"}
                    </Button>
                </div>


            </div>
            <div className="flex flex-col w-full md:w-1/2 h-[20rem] mt-8">
                <TextArea
                    id="prepare-mode"
                    placeholder="ex.: em uma panela coloque...."
                    label="Descreva como preparar sua receita:"
                />
            </div>
        </>
    )
}