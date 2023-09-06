import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Img } from "../../atoms/Img";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"
import Video from "../../atoms/Video";

export default function CarouselMidiasContent({ images,videos, object = "cover" }) {
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
                <SlArrowLeft className={`${images.length <= 1 ? "hidden" : "block"} text-s3 text-white`} />
            </div>

            <div
                data-id="container-imgs"
                className={`${images.length <= 1 ? "w-full" : "flex flex-nowrap w-full overflow-auto no-scrollbar snap-x snap-mandatory"}`}
            >
                {
                    !!videos?.length &&
                    <div
                        key={0}
                        className={`flex-none ${images.length <= 1 ? 'w-full' : 'w-[95%] border-l-2 ml-2 border-l-white snap-start'}  `}
                    >
                        <Video 
                            src={videos[0]} 
                            title="Video do contexto da págiona"
                            evFacebook={"View_recipe_video"}
                        />
                    </div>
                }
                
                {

                    images.map((img, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex-none ${images.length <= 1 ? 'w-full' : 'w-[95%] border-l-2 ml-2 border-l-white snap-start'}  `}
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
                    className={`${images.length <= 1 ? "hidden" : "block"} text-s3 text-white`}
                />
            </div>
        </div>
    )
}
