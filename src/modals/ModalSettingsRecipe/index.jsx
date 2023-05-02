import { useEffect, useRef, useState } from "react"
import { Input } from "../../components/atoms/Input"

import { FaUpload, FaRegTrashAlt, FaPlusCircle, FaSave, FaArrowLeft, FaTrash } from "react-icons/fa"

import { useCategoryApi, useRecipeApi } from "../../hooks/useApi"
import { Button } from "../../components/atoms/Button"
import { Loading } from "../../components/atoms/Loading/Loading"

export const ModalSettingsRecipe = ({ setActiveSettings, recipe, setCurrentRecipe }) => {
    const RefCategoryApi = useRef(useCategoryApi())
    const recipeApi = useRecipeApi();
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState()
    const [nameRecipe, setNameRecipe] = useState(recipe.name_recipe);
    const [nameCategory, setNameCategory] = useState(recipe.category.name_category);
    const [portion, setPortion] = useState(recipe.portion);
    const [time, setTime] = useState(recipe.time);
    const [ing, setIng] = useState(recipe.ing)
    const [stuffingIng, setStuffingIng] = useState(recipe.stuffing_ing)
    const [prepareMode, setPrepareMode] = useState(recipe.prepareMode.split('<step>'))
    const [images, setImages] = useState(recipe.images_recipe)
    const [valueInputIng, setValueInputIng] = useState('');
    const [valueInputStuffing, setValueInputStuffing] = useState('');
    const [valueInputPrepareMode, setValueInputPrepareMode] = useState('');

    useEffect(() => {
        (async () => {
            const { data } = await RefCategoryApi.current.getAllCategory();
            setCategories(data);
        })()
    }, [])



    const handleCloseModal = ({ target }) => {
        if (target.dataset.close === "close-modal") {
            setActiveSettings(false)
        }
    }

    const handleRemoveItemList = (array, itemRemove) => {
        return array.filter(item => item !== itemRemove)
    }

    const handleAddItemList = (array, setArray, value, setValue) => {
        if (value && !array.find(item => item === value)) {
            setArray(v => [...v, value])
            setValue("")
        } else {
            alert("O ingrediente já existe ou está vazio!")
        }
    }

    const handleUploadImage = async ({ currentTarget }) => {
        if (!loading) {
            try {
                setLoading(true);
                const file = currentTarget.querySelector("input#file").files[0]
                if (file) {
                    const form = new FormData();
                    form.append('image', file);

                    const { data } = await recipeApi.hostImages(form);
                    setImages(v => [...v, { ...data }])
                }
            } catch {
                alert("erro ao processar sua foto, tente novamente mais tarde.");
            }
            setLoading(false)
        }
    }

    const handleRemoveImage = ({ currentTarget }) => {
        const imgForRemove = currentTarget.id
        const imagesFiltered = images.filter(img => !img.small.includes(imgForRemove))
        setImages(imagesFiltered)
    }


    const handleUpdateRecipe = async () => {
        if (nameRecipe && nameCategory && ing.length && prepareMode) {
            const updateRecipe = {
                id: recipe.id,
                name_recipe: nameRecipe,
                name_category: nameCategory,
                images_recipe: images,
                ing: ing,
                stuffing_ing: stuffingIng,
                portion: Number(portion),
                time: Number(time),
                prepareMode: prepareMode.map((mode, index) => {
                    const isLastItem = index === (prepareMode.length - 1)
                    return isLastItem ? mode : `${mode}<step>`
                }).join(''),
                videos_recipe: []
            }

            const response = await recipeApi.updateRecipe(updateRecipe);

            if (response) {
                response.data.category = { name_category: nameCategory }
                setCurrentRecipe(response.data)
                handleCloseModal({ target: { dataset: { close: "close-modal" } } })
            }
        } else alert("Não deixe campos vazios!")
    };

    return (
        <div
            className="fixed top-0 left-0 z-[999] w-screen h-screen grid place-items-center bg-black/30"
        >
            <div className="w-full md:w-2/3 h-5/6 md:h-2/3 max-w-[1500px] bg-white rounded-2xl shadow-xl p-8 overflow-auto relative">
                <FaArrowLeft
                    onClick={handleCloseModal}
                    data-close="close-modal"
                    className="absolute top-4 left-4 text-s1_7 fill-color_orange cursor-pointer"
                />
                <h2 className="text-s1_5 text-center p-4 mb-8">informações sobre receita:</h2>
                <div className="w-full relative">
                    <div className="flex justify-center mb-8 gap-8 relative">
                        {loading && <Loading />}
                        {
                            images.map((image, index) =>
                                <div key={index} className="w-[120px] h-[100px] cursor-pointer group relative">
                                    <img
                                        src={image.small}
                                        alt={`Imagem representando a receita ${recipe.name_recipe}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-4 bg-black/50 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                        onClick={handleRemoveImage}
                                        id={image.small}
                                    >
                                        <FaTrash className="text-s3 fill-red-400"/>
                                        <h3 className="text-white text-s1">Remover</h3>
                                    </div>
                                </div>
                            )
                        }
                        <label htmlFor="file" onChange={handleUploadImage}>
                            <input
                                type="file"
                                id="file"
                                className="hidden"
                            />
                            <div className="w-[120px] h-[100px] relative cursor-pointer group border bg-gray-300/40 border-gray-400 rounded-lg flex flex-col justify-center items-center gap-4">
                                <FaUpload className="text-s3 text-gray-500/80" />
                                <h4 className="text-s1_1 text-gray-500/80">Adicionar</h4>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <Input
                            value={nameRecipe}
                            onChange={({ target }) => setNameRecipe(target.value)}
                            label="Nome da receita:"
                            customWidthAndMargin="w-full md:w-1/2 mt-6 md:my-12"
                        />

                        <div className="flex flex-col w-full md:w-1/2 relative">
                            <label className="text-s1_2 absolute -top-[50%] text-color_text_black">
                                Categoria:
                            </label>
                            <select
                                value={nameCategory}
                                onChange={({ target }) => setNameCategory(target.value)}
                                className="p-4 border hover:border-color_orange rounded-2xl outline-none text-center text-s1_2 cursor-pointer"
                            >
                                {
                                    categories?.map(category =>
                                        <option
                                            key={category.id}
                                            value={category.name_category}
                                        >
                                            {category.name_category}
                                        </option>
                                    )
                                }
                            </select>
                        </div>

                    </div>

                    <div className="flex justify-between items-center gap-12">
                        <Input
                            value={time}
                            onChange={({ target }) => setTime(target.value)}
                            label="Tempo para preparar a receita:"
                            customWidthAndMargin="w-1/2 my-12"
                        />
                        <Input
                            value={portion}
                            onChange={({ target }) => setPortion(target.value)}
                            label="Quantas porções a receita rende:"
                            customWidthAndMargin="w-1/2 my-12"
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <h2 className="text-s2 text-color_orange p-8">Ingredientes: </h2>
                        {
                            !!ing.length ? ing.map((i, index) =>
                                <div key={index} className="flex w-full md:w-1/2 justify-between text-s1_3 md:text-s1_2 my-4">
                                    <p>{i}</p>
                                    <FaRegTrashAlt
                                        onClick={() => setIng(handleRemoveItemList(ing, i))}
                                        className="fill-red-700 cursor-pointer"
                                    />
                                </div>
                            )
                                :
                                <h2 className="bg-red-500/20 p-2 text-s1_2 rounded-xl">Adicione ao menos um ingrediente!</h2>
                        }
                        <div className="flex w-full md:w-1/2 items-center gap-6 my-8">
                            <Input
                                value={valueInputIng}
                                onChange={({ target }) => setValueInputIng(target.value)}
                                placeholder="Adicione um novo ingrediente..."
                                onKeyDown={({ code }) => code === "Enter" && handleAddItemList(ing, setIng, valueInputIng, setValueInputIng)}
                                customWidthAndMargin="w-full"
                            />
                            <FaPlusCircle
                                className="fill-green-700 text-s2 cursor-pointer"
                                onClick={() => handleAddItemList(ing, setIng, valueInputIng, setValueInputIng)}
                            />
                        </div>
                    </div>

                    <div className={`flex-col items-center ${!!stuffingIng.length ? 'flex' : 'hidden'}`}>
                        <h2 className="text-s2 text-color_orange p-8">Ingredientes do Recheio: </h2>
                        {
                            stuffingIng.map(stuffing =>
                                <div className="flex w-full md:w-1/2 justify-between text-s1_3 md:text-s1_1 my-4">
                                    <p>{stuffing}</p>
                                    <FaRegTrashAlt
                                        onClick={() => setStuffingIng(handleRemoveItemList(stuffingIng, stuffing))}
                                        className="fill-red-700 cursor-pointer"
                                    />
                                </div>
                            )
                        }

                        <div className="flex w-1/2 items-center gap-6 my-8">
                            <Input
                                value={valueInputStuffing}
                                onChange={({ target }) => setValueInputStuffing(target.value)}
                                placeholder="Adicione um novo ingrediente parta recheio..."
                                onKeyDown={({ code }) => code === "Enter" && handleAddItemList(stuffingIng, setStuffingIng, valueInputStuffing, setValueInputStuffing)}
                                customWidthAndMargin="w-full"
                            />
                            <FaPlusCircle
                                className="fill-green-700 text-s2 cursor-pointer"
                                onClick={() => handleAddItemList(stuffingIng, setStuffingIng, valueInputStuffing, setValueInputStuffing)}
                            />
                        </div>
                    </div>

                    <div className={`flex flex-col items-center my-8`}>
                        <h2 className="text-s2 text-color_orange p-8">Modo de preparo: </h2>
                        {
                            prepareMode.map((mode, index) =>
                                <div key={index} className="flex w-full md:w-5/6 justify-between text-s1_3 md:text-s1_1 my-4">
                                    <div className="flex">
                                        <span>{index + 1} </span>
                                        <p>- {mode}</p>
                                    </div>
                                    <FaRegTrashAlt
                                        onClick={() => setPrepareMode(handleRemoveItemList(prepareMode, mode))}
                                        className="fill-red-700 cursor-pointer"
                                    />
                                </div>
                            )
                        }
                        <div className="flex w-full md:w-5/6 items-center gap-6 my-8">
                            <Input
                                value={valueInputPrepareMode}
                                onChange={({ target }) => setValueInputPrepareMode(target.value)}
                                placeholder="Adicione um novo modo de preparo..."
                                onKeyDown={({ code }) => code === "Enter" && handleAddItemList(prepareMode, setPrepareMode, valueInputPrepareMode, setValueInputPrepareMode)}
                                customWidthAndMargin="w-full"
                            />
                            <FaPlusCircle
                                className="fill-green-700 text-s2 cursor-pointer"
                                onClick={() => handleAddItemList(prepareMode, setPrepareMode, valueInputPrepareMode, setValueInputPrepareMode)}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-[66%] mx-auto flex justify-evenly fixed bottom-[8.5%] md:bottom-[16.5%] left-0 md:left-1/2 md:-translate-x-1/2 rounded-2xl bg-color_orange/30 border border-t-black/30 p-4">
                        <Button
                            data-close={'close-modal'}
                            event={handleCloseModal}
                            className="underline text-s1"
                        >Sair sem salvar</Button>
                        <Button
                            event={handleUpdateRecipe}
                            customClass="px-6 py-3 btn-primary text-s1_2"
                        > <FaSave /> Atualizar receita</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}