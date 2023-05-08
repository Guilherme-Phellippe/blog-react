import { InfoRecipeHeader } from '../../molecules/InfoRecipeHeader';
import { RecipeChefInfo } from '../../molecules/RecipeChefInfo';
import { LikeComentsSaveButtons } from '../../molecules/LikeComentSaveButtons'

export const InfoTipContent = ({ tip }) => {
    const { name_tip, description_tip, images, nmr_hearts, nmr_saved } = tip

    return (
        <div className="w-full md:w-2/3 p-4">
            <InfoRecipeHeader nmr_hearts={nmr_hearts} name_recipe={name_tip} />

            <img className='mx-auto my-12' src={images[0].medium} alt={"imagem de"+ name_tip} />

            <div className="flex my-8 mb-12">
                <div
                    className='text-s1_7 leading-10 tracking-wide text-color_text_black/80'
                    dangerouslySetInnerHTML={{ __html: description_tip }}
                ></div>
            </div>
            <RecipeChefInfo recipe={tip} />
            <div className="w-full py-4 mt-4 bg-[#24242420]">
                <LikeComentsSaveButtons nmr_hearts={nmr_hearts} nmr_saved={nmr_saved} />
            </div>
        </div>
    )
}