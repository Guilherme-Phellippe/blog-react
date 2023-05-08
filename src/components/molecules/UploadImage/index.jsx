import { useState } from "react";
import { useRecipeApi } from "../../../hooks/useApi";
import { Loading } from "../../atoms/Loading/Loading";
import { dialog } from '../../../modals/Dialog'

export const UploadImage = ({ images , setImages}) => {
    const [loading, setLoading] = useState(false)
    const recipeApi = useRecipeApi()

    const handleUploadImages = async ({ target }) => {
        const files = target.files

        setLoading(true)
        if (files) {
            for (let file of files) {
                if(file.size < 4000000 ){
                    const form = new FormData();
                    form.append('image', file);
                    const { data } = await recipeApi.hostImages(form)
                    setImages(img => [...img, data])
                }else dialog("Imagem muito grande escolhe um tamanho menor ou diminu-a sua imagem!", 1)
            }
            setLoading(false)
        } else alert("erro ao enviar a imagem");
    };

    const handleRemoveImage = ({ currentTarget }) => {
        const imgForRemove = currentTarget.querySelector("img").src
        const imagesFiltered = images.filter(img => !img.small.includes(imgForRemove))
        setImages(imagesFiltered)
    }


    return (
        <>
            <label
                forhtml="image-file"
                className="w-full md:w-1/2 h-[10rem] cursor-pointer border-2 border-dotted border-color_orange flex justify-center items-center relative"
            >
                <h2 className="text-s1_3 text-gray-500">
                    Clique ou solte suas imagens aqui
                </h2>

                <input
                    type="file"
                    className="hidden"
                    onChange={handleUploadImages}
                />

                {loading && <Loading />}

            </label>
            <div className={`flex m-4 w-1/2 min-h-[5rem] gap-4 ${!!images.length ? 'block':'hidden'}`}>
                {
                    images.map((img, index) => {
                        return (
                            <div
                                key={index}
                                onClick={handleRemoveImage}
                                className="relative w-[50px] h-[40px] cursor-pointer group">
                                <img
                                    className="w-full h-full object-cover rounded-xl group-hover:opacity-40"
                                    src={img.small} alt="imagem enviada pelo usuário" />
                                <span
                                    className="absolute w-full h-full top-1/4 left-[33%] text-s2_5 text-red-500 hidden group-hover:block font-bold">X</span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}