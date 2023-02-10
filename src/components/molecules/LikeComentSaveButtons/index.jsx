import { FaHeart, FaSave } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri"
import { Button } from "../../atoms/Button";

const contents = [
    {
        icon: <FaHeart />,
        title: "amei"
    },
    {
        icon: <RiMessage2Fill />,
        title: 'comentar'
    },
    {
        icon: <FaSave />,
        title: 'salvar'
    },
]


export const LikeComentsSaveButtons = () => {
    return (
        <div className="flex w-5/6">
            {contents.map(content =>
                <Button 
                    key={content.title}
                    customClass=
                    {"flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_3"}
                >{content.icon} {content.title}</Button>)}
        </div>
    )
}
