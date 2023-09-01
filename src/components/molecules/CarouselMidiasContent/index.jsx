import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Img } from "../../atoms/Img";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import Video from "../../atoms/Video";

export default function CarouselMidiasContent({ recipe, object = "cover" }) {
    const { valueSearch } = useContext(HomeContext);


    const handleScrollImgs = (e) => {
        const currentTarget = e.currentTarget
        const container = currentTarget.closest('div[data-id=container]').querySelector('[data-id=container-imgs]')

        var currentPosition = 0;

        if (currentTarget.dataset.side === 'right')
            currentPosition = container.scrollLeft + container.getBoundingClientRect().width
        else if (currentTarget.dataset.side === "left")
            currentPosition = container.scrollLeft - container.getBoundingClientRect().width

        container.scroll({ top: 0, left: currentPosition, behavior: "smooth" })
    }
    return (
        <div
            data-id="container"
            className={`${valueSearch ? "order-1 w-1/2 h-full" : 'h-auto'} w-full flex max-h-[500px] mt-4 overflow-hidden relative`}
        >
            <div
                data-side="left"
                onClick={handleScrollImgs}
                className="flex items-center h-full absolute left-0 top-0 cursor-pointer bg-gradient-to-r from-black/70 to-transparent"
            >
                <SlArrowLeft className={`${recipe.images_recipe?.length <= 1 ? "hidden" : "block"} text-s3 text-white`} />
            </div>

            <div
                data-id="container-imgs"
                className={`${recipe.images_recipe?.length <= 1 ? "w-full" : "flex flex-nowrap w-full overflow-auto no-scrollbar snap-x snap-mandatory"}`}
            >
                {
                    !!recipe.videos_recipe?.length &&
                    <div
                        key={0}
                        className={`flex-none ${recipe.images_recipe.length <= 1 ? 'w-full' : 'w-[95%] border-l-2 ml-2 border-l-white snap-start'}  `}
                    >
                        <Video src={recipe.videos_recipe[0]} title={recipe.name_recipe}/>
                    </div>
                }
                
                {
                    recipe.images_recipe.map((img) => {
                        return (
                            <div
                                key={img.small}
                                className={`flex-none ${recipe.images_recipe.length <= 1 ? 'w-full' : 'w-[95%] border-l-2 ml-2 border-l-white snap-start'}  `}
                            >
                                <Img imgs={img} alt={"Imagens relacionadas ao conteúdo"} object={object} />
                            </div>
                        )
                    })
                }
            </div>

            <div
                data-side="right"
                onClick={handleScrollImgs}
                className="flex items-center h-full absolute right-0 top-0 cursor-pointer  bg-gradient-to-l from-black/70 to-transparent"
            >
                <SlArrowRight
                    className={`${recipe.images_recipe.length <= 1 ? "hidden" : "block"} text-s3 text-white`}
                />
            </div>
        </div>
    )
}
