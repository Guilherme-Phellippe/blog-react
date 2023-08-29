import { useEffect, useState } from "react"
import { Img } from "../../atoms/Img"
import ContainerProductsUsedRecipe from "../ContainerProductsUsedRecipe";
import axios from "axios";
// const products = [
//     {
//         id: 0,
//         name: "Mini Processador Triturador Mixer de Alimento Manual 3 Laminas",
//         description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus accusamus consequuntur aspernatur, iusto corporis atque laboriosam neque assumenda. Doloribus omnis tempore blanditiis rem nobis reprehenderit aliquid assumenda perspiciatis amet. Perferendis!",
//         prices: [23.43,19.99,11.2],
//         images:[
//             "https://m.media-amazon.com/images/I/51Wh9sy5i6L.__AC_SX300_SY300_QL70_ML2_.jpg",
//             "https://m.media-amazon.com/images/I/61tU99kkyoL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/41UlV1PS40L._AC_SX522_.jpg",
//         ]
//     },
//     {
//         id: 1,
//         name: "Multifuncional Vegetais Cortador de Carne Ralador Triturador Conjunto Faça Você Mesmo com Frasco de Grande Capacidade Manual Manuomotive Mini Size Portátil Destacável Lavável para Uso na Coz",
//         description:"",
//         prices: [123.43,99.99,112],
//         images:[
//             "https://m.media-amazon.com/images/I/51yM9boWwHL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/61eUKPxD4eL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/71S48bjHp+L._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/61m2IDGqUSL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/81GMdLh7QSL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/718nG+qlMtS._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/71B3r+jnOiL._AC_SX522_.jpg",
//         ]
//     },
//     {
//         id: 2,
//         name: "Mini Processador Triturador Mixer de Alimento Manual 3 Laminas",
//         description:"",
//         prices: [76.43,99.99,78.99],
//         images:[
//             "https://m.media-amazon.com/images/I/51Wh9sy5i6L.__AC_SX300_SY300_QL70_ML2_.jpg",
//             "https://m.media-amazon.com/images/I/61tU99kkyoL._AC_SX522_.jpg",
//             "https://m.media-amazon.com/images/I/41UlV1PS40L._AC_SX522_.jpg",
//         ]
//     },
// ]

const ProductsUsedRecipe = ({ usedProducts }) => {
    const [showContainerProducts, setContainerProducts] = useState();
    const [products, setProducts] = useState()

    useEffect(()=>{
        if(usedProducts){
            (async ()=>{
                const { data } = await axios.get("https://alk.temsabor.blog/products_ad").catch(err => console.log(err))
                const filteredUsedProducts = data.filter(d =>  usedProducts.find(up => up === d.id))
                console.log(filteredUsedProducts)
                setProducts(filteredUsedProducts)
            })()
        }
    },[usedProducts])

    return (
        !!products?.length &&
        <div className="w-full min-h-[150px] my-8 shadow-lg">
            <h2 className="text-center p-4 text-s2 font-medium">Produtos utilizados para preparar a receita:</h2>
            <div className="w-full h-[120px] md:h-[150px] overflow-hidden relative border-[1px] rounded-xl">
                <div className="w-full h-full blur-[5px] md:blur-[8px]">
                    <Img imgs={"https://i.ibb.co/tYHJgtd/Design-sem-nome-8.jpg"} />
                </div>
                <button
                    onClick={() => setContainerProducts(true)}
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