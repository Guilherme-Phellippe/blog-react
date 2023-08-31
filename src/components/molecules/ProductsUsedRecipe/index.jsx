import { useEffect, useState } from "react"
import { Img } from "../../atoms/Img"
import ContainerProductsUsedRecipe from "../ContainerProductsUsedRecipe";
import axios from "axios";


const ProductsUsedRecipe = ({ usedProducts }) => {
    const [showContainerProducts, setContainerProducts] = useState();
    const [products, setProducts] = useState()

    useEffect(()=>{
        if(usedProducts){
            (async ()=>{
                const { data } = await axios.get("https://alk.temsabor.blog/products_ad").catch(err => console.log(err))
                const filteredUsedProducts = data.filter(d =>  usedProducts.find(up => up === d.id))
                setProducts(filteredUsedProducts)
            })()
        }
    },[usedProducts]);

    const handleClickButton = ()=>{
        setContainerProducts(true)
        // eslint-disable-next-line no-undef
        fbq('trackCustom', 'ev_products_used_recipe');
    }

    return (
        !!products?.length &&
        <div className="w-full min-h-[150px] my-8 shadow-lg">
            <h2 className="text-center py-4 md:p-4 text-s1_7 md:text-s2 font-medium">Produtos utilizados para preparar a receita:</h2>
            <div className="w-full h-[120px] md:h-[150px] overflow-hidden relative border-[1px] rounded-xl">
                <div className="w-full h-full blur-[5px] md:blur-[8px]">
                    <Img imgs={"https://i.ibb.co/tYHJgtd/Design-sem-nome-8.jpg"} />
                </div>
                <button
                    onClick={handleClickButton}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-color_orange rounded-3xl text-white font-bold text-s1_3"
                >
                    Veja todos os produtos
                </button>
            </div>
            {
                showContainerProducts &&
                <ContainerProductsUsedRecipe
                    products={products}
                    setContainerProducts={setContainerProducts}
                />
            }
        </div>
    )
}

export default ProductsUsedRecipe