import { useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import Caroucel from "../../molecules/CarouselMidiasContent"
import { formatTextLong } from "../../../scripts/formatTextLong";
import { FaShoppingBasket } from "react-icons/fa";
import ChooseProvider from "../ChooseProvider";


const ContainerProductsUsedRecipe = ({ products, setContainerProducts }) => {
    const refContainer = useRef();
    const refAllProducts = useRef();
    const [productSelected, setProductSelected] = useState()

    useEffect(() => {
        if (refContainer.current) {
            setTimeout(() => {
                refContainer.current.classList.remove("scale-0")
                refContainer.current.classList.add("scale-100")
            }, 100)

        }
    }, []);


    const maxNumber = (array) => {
        const newArray = array.sort((a, b) => b.price - a.price)
        const value1 = newArray[0].price.toFixed(2).toString()
        const value2 = newArray[newArray.length - 1].price.toFixed(2).toString()
        const arrayFormat = [value1.replace(".", ","), value2.replace(".", ",")]
        return arrayFormat
    }

    const handleShowProvider = ({ currentTarget }) => {
        refAllProducts.current.classList.add("hidden")
        refAllProducts.current.classList.remove("flex")
        const product = products.find(product => product.id === currentTarget.id)
        setProductSelected(product)
    }




    return (
        <div ref={refContainer} className="w-screen h-screen bg-[#000d] fixed top-0 left-0 z-[1000] scale-0 transition-transform duration-300 grid place-items-end md:place-items-center">
            <MdClose
                onClick={() => setContainerProducts(false)}
                className="text-s3 text-white absolute top-5 right-10 cursor-pointer"
            />

            <div
                ref={refAllProducts}
                className="w-full md:w-3/4 md:h-3/4 bg-[#000d] md:bg-white flex flex-col items-center gap-4 md:gap-8 overflow-auto"
            >
                {
                    products.map(product =>
                        <div key={product.id} className="w-full md:w-3/5 border-[1px] my-4 md:border-black/30 bg-white flex flex-col items-center">
                            <h2 className="text-center p-4 text-s1_7 font-bold text-color_orange">{formatTextLong(product.product_name, 70)}</h2>
                            <div className="p-4 w-[90%] h-3/5 border-[1px] rounded-xl border-color_orange/50 overflow-hidden">
                                <Caroucel img={product.product_images} />
                            </div>
                            <p className="text-s1_5 text-center my-4 mx-auto px-4">{product.description}</p>
                            <div className="flex flex-col items-center text-s1_3 my-4">
                                <h3 className="text-s1_5 font-medium">Os preços estão entre:</h3>
                                <div className="flex justify-center items-center my-4 ">
                                    <span className="text-green-700">R$</span>
                                    <span className="text-s2 text-green-800">{maxNumber(product.link)[1]} e {maxNumber(product.link)[0]}</span>
                                </div>
                            </div>
                            <button
                                onClick={(e) => handleShowProvider(e)}
                                id={product.id}
                                className="bg-green-700 text-white p-4 px-8 text-s1_5 rounded-2xl flex justify-center items-center gap-3 mb-12">
                                Comprar agora <FaShoppingBasket />
                            </button>
                        </div>
                    )
                }
            </div>

            {productSelected && <ChooseProvider product={productSelected} />}
                



        </div>
    )
}

export default ContainerProductsUsedRecipe