import { Link } from "react-router-dom"

export const DescriptionTip = ({ content }) => {
    return (
        <Link to={`/tip/${content.name_tip.replace('?','')}/${content.id}`}>
            <div className="flex flex-col h-auto max-h-[46rem] overflow-hidden items-center border-b px-4 pb-8 relative cursor-pointer">
                <h2 className="text-s1_7 mb-8 px-4">{content.name_tip}</h2>
                <img className="w-[200px] object-cover mb-12" src={content.images[0].medium} alt={"imagem de " + content.name_tip} />
                <div className="text-s1_5 leading-8 text-color_text_black/80" dangerouslySetInnerHTML={{ __html: content.description_tip }}></div>
                <div className="w-full h-[3rem] absolute bottom-0 flex justify-center items-center bg-gradient-to-t from-black/30 via-black/20 to-transparent">
                    <span className="text-s1_2 bg-color_orange p-1 px-4 text-white underline rounded-2xl">Ler mais</span>
                </div>
            </div>
        </Link>
    )
}