import { FaCheckCircle, FaSearch } from "react-icons/fa";
import { Img } from "../../atoms/Img";
import { useEffect, useState } from "react";
import { Loading } from "../../atoms/Loading/Loading";

const providersImages = [
    {
        name: "amazon",
        img: "https://m.media-amazon.com/images/G/32/social_share/amazon_logo._CB633267191_.png"
    },
    {
        name: "shopee",
        img: "https://cuponomia-a.akamaihd.net/img/stores/original/shopee-637268866674503035.png"
    },
]

export default function ChooseProvider({ product }) {

    const [loading, setLoading] = useState(true)

    const handleClickProvider = ({ currentTarget }) => {
        const provider = currentTarget.dataset.provider;
        const link = product.link.find(l => l.provider === provider);
        if (link) window.open(link.url)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    }, [])

    return (
        <div
            className="w-full h-full flex flex-col items-center gap-4 justify-center"
        >
            <div className="w-full md:w-1/2 flex flex-col gap-4 rounded-lg items-center bg-white">
                <h3 className="text-s2 text-center pt-4">Fazemos uma busca avançada em cada marketplace</h3>
                <h3 className="text-s2 text-center">Buscando sempre:</h3>
                <div className="flex flex-col">
                    <span className="flex items-center gap-2 text-s1_4 my-1"><FaCheckCircle className="text-green-700" /> Melhores preços</span>
                    <span className="flex items-center gap-2 text-s1_4 my-1 "><FaCheckCircle className="text-green-700" /> Compra segura</span>
                    <span className="flex items-center gap-2 text-s1_4 my-1 "><FaCheckCircle className="text-green-700" /> Envio imediato</span>
                    <span className="flex items-center gap-2 text-s1_4 my-1 "><FaCheckCircle className="text-green-700" /> Qualidade</span>
                </div>
                {
                    loading ?
                        <div className="flex min-h-[150px] flex-col items-center">
                            <h2 className="text-s2">Buscando os melhores produtos</h2>
                            <Loading />
                        </div>
                        :
                        <>
                            <h2 className="text-s2 text-center font-bold flex items-center gap-2 text-blue-700"> <FaSearch /> Veja oque encontramos</h2>
                            <h2 className="text-s2 text-center">Selecione sua plataforma preferida:</h2>
                            <div className="flex gap-4 mb-16">
                                {
                                    product.link.map(productLink =>
                                        <div
                                            key={productLink.provider}
                                            data-provider={productLink.provider}
                                            onClick={handleClickProvider}
                                            className="flex flex-col items-center cursor-pointer shadow-md border-[1px] border-blue-700 rounded-2xl py-4"
                                        >
                                            <div className="w-[150px] h-[100px] mx-auto">
                                                <Img imgs={providersImages.find(img => img.name === productLink.provider).img} />
                                            </div>
                                            <span className="text-s1_5 bg-blue-700 p-2 rounded-lg text-white">R${productLink.price.toFixed(2).toString().replace(".", ",")}</span>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                }

            </div>
        </div>
    )
}