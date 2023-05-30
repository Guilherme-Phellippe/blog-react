import { useContext } from "react"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Img } from "../../atoms/Img";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl"

export const CarouselMidiasContent = ({ img: imgs, name_recipe, category }) => {
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
        <>

            {category &&
                <div id="title-recipe" className={`flex flex-col gap-2 items-center px-2 h-[5%] ${valueSearch ? 'hidden' : ''}`}>
                    <h3 className="text-s1_2 text-color_orange">{category}</h3>
                    <h2 className="text-s1_4 leading-6">{name_recipe}</h2>
                </div>
            }


            <div
                data-id="container"
                className={`${valueSearch ? "order-1 w-1/2 h-full" : 'h-auto'} w-full flex max-h-[500px] mt-4 overflow-hidden relative`}
            >
                <div
                    data-side="left"
                    onClick={handleScrollImgs}
                    className="flex items-center h-full absolute left-0 top-0 cursor-pointer"
                >
                    <SlArrowLeft className={`${imgs.length <= 1 ? "hidden" : "block"} text-s3 text-white`} />
                </div>

                <div
                    data-id="container-imgs"
                    className={`${imgs.length <= 1 ? "w-full" : "flex flex-nowrap w-full overflow-auto no-scrollbar snap-x snap-mandatory"}`}
                >
                    {
                        imgs.map((img, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex-none ${imgs.length <= 1 ? 'w-full' : 'w-[95%] border-l-2 ml-2 border-l-white snap-start'}  `}
                                >
                                    <Img imgs={img} alt={name_recipe} />
                                </div>
                            )
                        })
                    }
                </div>

                <div
                    data-side="right"
                    onClick={handleScrollImgs}
                    className="flex items-center h-full absolute right-0 top-0 cursor-pointer"
                >
                    <SlArrowRight
                        className={`${imgs.length <= 1 ? "hidden" : "block"} text-s3 text-white`}
                    />
                </div>
            </div>

            <ins className="adsbygoogle"
                style={{ display: 'block', padding: "8px 2px" }}
                data-ad-client="ca-pub-4781060024956035"
                data-ad-slot="9346456414"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </>
    )
}