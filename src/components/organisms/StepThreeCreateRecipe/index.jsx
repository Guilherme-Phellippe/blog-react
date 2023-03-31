import { useRef, useState } from "react"
import { FaPlusCircle } from "react-icons/fa"
import { MdRemoveCircle } from "react-icons/md"
import { useRecipeApi } from "../../../hooks/useApi"
import { Input } from "../../atoms/Input"


export const StepThreeCreateRecipe = ({ images, setImages }) => {
    const apiImg = useRef(useRecipeApi());
    const [wordKeys, setWordKeys] = useState([])
    const refWordKeys = useRef(null)


    const handleAddListWordKeys = () => {
        const value = refWordKeys.current.value
        !!value.length ? setWordKeys(v => [...v, value]) : alert("Digite a palavra chave")
        refWordKeys.current.value = ''
        refWordKeys.current.focus();
    }

    const handleRemoveListIngredients = ({ currentTarget }) => {
        const li = currentTarget.closest('li').querySelector('p').textContent;
        const index = wordKeys.indexOf(li);
        wordKeys.splice(index, 1)
        setWordKeys(() => [...wordKeys])
    }

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault()
            handleAddListWordKeys()
        }
    }


    const handleUploadImages = async ({ target }) => {
        const files = target.files

        if (files) {
            for (let file of files) {
                const form = new FormData();
                form.append('image', file);
                const { data } = await apiImg.current.hostImages(form)

                setImages((imgs)=> [...imgs, data]);

            }

        } else alert("erro ao enviar a imagem");
    };

    const hanldeRemoveImage = ({ currentTarget }) => {
        const imgForRemove = currentTarget.querySelector("img").src
        const imagesFiltered = images.filter(img => !img.small.includes(imgForRemove))
        setImages(imagesFiltered)
    }


    return (
        <>
            <label
                forhtml="image-file"
                className="w-1/2 h-[10rem] cursor-pointer border-2 border-dotted border-color_primary flex justify-center items-center"
            >
                <h2 className="text-s1_3 text-gray-500">
                    Clique ou solte suas imagens aqui
                </h2>

                <input
                    type="file"
                    id="image-file"
                    className="hidden"
                    onChange={handleUploadImages}
                />

            </label>
            {!!images.length &&
                <div className="flex m-4 w-1/2 min-h-[5rem] gap-4">
                    {images.map(img => {
                        return (
                            <div 
                                key={img.small}
                                onClick={hanldeRemoveImage} 
                                className="relative w-[50px] h-[40px] cursor-pointer group">
                                <img
                                    className="w-full h-full object-cover rounded-xl group-hover:opacity-40"
                                    src={img.small} alt="imagem enviada pelo usuário" />
                                <span
                                    className="absolute w-full h-full top-1/4 left-[33%] text-s2_5 text-red-500 hidden group-hover:block font-bold">X</span>
                            </div>
                        )
                    })}
                </div>
            }



            <div className="w-1/2 flex flex-col my-8">
                <h2 className="text-s1_5 w-full text-center">Coloque palavras chaves para sua receita ficar bem ranqueada</h2>
                {!!wordKeys.length && <ul id="word-keys" className="w-1/2 mx-auto my-4 text-s1_1 flex flex-col justify-center">
                    {wordKeys.map((word, index) =>
                        <li
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <p>{word}</p> <MdRemoveCircle
                                className="text-s1_5 cursor-pointer fill-red-500 hover:fill-red-800"
                                onClick={handleRemoveListIngredients}
                            />

                        </li>)
                    }</ul>}
                <Input
                    ref={refWordKeys}
                    size={4}
                    placeholder="Digite suas palavras chaves..."
                    onKeyDown={handleKeyDown}
                    icon={<FaPlusCircle
                        className="text-s1_7 fill-green-500 cursor-pointer"
                        onClick={handleAddListWordKeys}
                    />}
                />
            </div>
        </>
    )
}