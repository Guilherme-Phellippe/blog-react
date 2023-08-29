import { Img } from "../Img"

const ArticleAds = () => {
    return (
        <div className="flex max-h-[80px] shadow-md">
            <div className="w-1/5">
                <Img imgs={"https://m.media-amazon.com/images/I/41qN01i9TuL._AC_.jpg"} />
            </div>
            <div className="w-4/5 flex flex-col">
                <h2 className='text-s1_3 h-1/2 p-4 font-bold text-center'>Descobri o segredo das batatas de supermercado!!!</h2>
                <div className="flex p-2 md:px-4 w-full h-1/2 items-end justify-between">
                    <p className='text-s1_3 text-center w-3/4'>é esse produtinho aqui...</p>
                    <a
                        href="https://amzn.to/3YSHUDe"
                        target='_blank'
                        rel="noreferrer"
                        className='bg-green-700 px-2 py-1 rounded-lg text-white font-medium'
                    >Saiba mais</a>
                </div>
            </div>
        </div>
    )
}

export default ArticleAds