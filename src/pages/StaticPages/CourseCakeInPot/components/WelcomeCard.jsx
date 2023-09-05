import { Img } from "../../../../components/atoms/Img"

const WelcomeCard = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center w-4/5 md:w-1/2 py-4 md:m-4 rounded-t-2xl bg-white md:bg-zinc-300 self-center md:self-end shadow-md border-b-4 border-color_orange">
            <div className="w-[90%] md:w-2/3 flex flex-col md:items-end order-2 md:order-1">
                <h2 className="text-s2_5 text-center pt-2 md:p-2 font-medium">Olá, muito prazer!</h2>
                <h2 className="text-s2 p-2 text-center font-medium">meu nome é Julia.</h2>
                <h3 className="text-s1_7 md:text-s1_5 text-center md:text-right p-2 leading-8 opacity-90">
                    Estou muito feliz em ver você aqui! Isso significa que assim como eu,
                    você também deseja sua liberdade financeira, então não se preocupe,
                    eu entendo a sua dor e vou explicar tudinho para você!
                </h3>
            </div>
            <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] order-1 md:order-2 overflow-hidden rounded-full">
                <Img
                    imgs={"https://i.ibb.co/Ph7Hqc9/conceito-de-felicidade-bem-estar-e-confianca-mulher-afro-americana-atraente-alegre-corte-de-cabelo-e.jpg"}
                    alt={"foto de julia galvao"}
                />
            </div>
        </div>
    )
}

export default WelcomeCard