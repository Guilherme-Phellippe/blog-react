

import { FcSearch } from "react-icons/fc"

import { Input } from "../../atoms/Input"
import { Button } from "../../atoms/Button"

export const PanelListTips = ({ tips }) => {

    return (
        <div className={`w-full flex flex-col justify-center items-center mx-auto`}>

            <h2 className="text-s1_5 my-4 text-color_sub_text text-center">Encontre sua receita</h2>
            <Input
                placeholder="Busque uma receita"
                icon={<FcSearch className="text-s2" />}
                customWidthAndMargin="my-4 w-3/5"
            />


            <div className={`w-full flex gap-y-4 justify-center items-center h-auto py-8 mt-12`}>
                {
                    tips.length ?
                        tips.map((tip, key) =>
                            <div
                                key={key}
                                className="flex flex-col w-1/4 h-[300px] border border-color_orange rounded-lg overflow-hidden cursor-pointer"
                            >
                                <h2 className="text-s1_2 p-4 text-center">{tip.name_tip}</h2>
                                <img className="w-1/2 mx-auto object-cover" src={tip.images[0].small} alt={tip.name_tip} />
                                <p className="p-4 opacity-50" dangerouslySetInnerHTML={{ __html: tip.description_tip }}></p>
                            </div>
                        )
                        : <div className="flex flex-col items-center">
                            <p className="text-s1_5 my-12">Não encontramos nenhuma receita sua =(</p>
                            <Button>Criar uma receita</Button>
                        </div>
                }
            </div>
        </div>
    )
}