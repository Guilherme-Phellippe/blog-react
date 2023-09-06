import { useEffect, useRef, useState } from "react"
import { MdClose } from "react-icons/md"
import Caroucel from "../../molecules/CarouselMidiasContent"
import { formatTextLong } from "../../../scripts/formatTextLong";
import { FaShoppingBasket } from "react-icons/fa";
import ChooseProvider from "../ChooseProvider";

import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";


const ContainerProductsUsedRecipe = ({ products, setContainerProducts }) => {
    const refContainer = useRef();
    const refAllProducts = useRef();
    const [productSelected, setProductSelected] = useState();
    const [indexProduct, setIndexProduct] = useState(0);


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

    const changeDisplayProduct = ({ currentTarget }) => {
        const button = currentTarget.dataset.btnPosition;
        button === "right" ?
            (setIndexProduct(v => v >= Number(products.length - 1) ? 0 : v + 1))
            :
            (setIndexProduct(v => v > 0 ? v - 1 : Number(products.length - 1)))
    }



    return (
        <div ref={refContainer} className="w-screen h-screen bg-[#000d] fixed top-0 left-0 z-[1000] scale-0 transition-transform duration-300 grid place-items-end md:place-items-center">
            <MdClose
                onClick={() => setContainerProducts(false)}
                className="text-s3 text-white bg-red-700 absolute top-2 right-5 rounded-xl cursor-pointer z-[999]"
            />

            <div
                ref={refAllProducts}
                className="w-full md:w-3/4 max-w-[800px] h-full md:h-3/4 px-2 bg-white flex justify-between items-center overflow-hidden relative"
            >
                <BsFillArrowLeftCircleFill
                    onClick={changeDisplayProduct}
                    data-btn-position="left"
                    className="abasolute top-0 left-0 text-s4 z-[999] cursor-pointer fill-color_orange"
                />

                <div key={products[indexProduct].id} className="w-full md:w-4/5 max-w-[500px] h-full my-4 bg-white flex flex-col  items-center">
                    <h2 className="py-6 text-s2 font-bold text-color_orange">{formatTextLong(products[indexProduct].product_name, 70)}</h2>
                    <div className="w-full border-[1px] rounded-xl border-color_orange/50 overflow-hidden grid place-items-center">
                        <Caroucel 
                            images={products[indexProduct].product_images}
                            object="contain"
                         />
                    </div>
                    <p className="text-s1_5 text-center my-4 mx-auto text-color_text_black_light">{products[indexProduct].description}</p>
                    <div className="flex flex-col items-center text-s1_3 my-4">
                        <h3 className="text-s1_5 font-medium">Os preços estão entre:</h3>
                        <div className="flex justify-center items-center my-4 ">
                            <span className="text-green-700">R$</span>
                            <span className="text-s2 text-green-800">{maxNumber(products[indexProduct].link)[1]} e {maxNumber(products[indexProduct].link)[0]}</span>
                        </div>
                    </div>
                    <button
                        onClick={(e) => handleShowProvider(e)}
                        id={products[indexProduct].id}
                        className="bg-green-700 text-white p-4 px-8 text-s1_5 rounded-2xl flex justify-center items-center gap-3 mb-12">
                        Comprar agora <FaShoppingBasket />
                    </button>
                </div>

                <BsFillArrowRightCircleFill
                    onClick={changeDisplayProduct}
                    data-btn-position="right"
                    className="abasolute top-0 left-0 text-s4 z-[999] cursor-pointer fill-color_orange"
                />
            </div>

            {productSelected && <ChooseProvider product={productSelected} />}




        </div>
    )
}

export default ContainerProductsUsedRecipe