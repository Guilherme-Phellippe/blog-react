import { FaHeart, FaSave } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri"
import { Button } from "../../atoms/Button";

const contents = [
    {
        icon: <FaHeart className="group-hover:fill-red-500 " />,
        title: <p className="group-hover:text-red-400" >Amei</p>
    },
    {
        icon: <RiMessage2Fill className="group-hover:fill-blue-500 " />,
        title: <p className="group-hover:text-blue-400" >Comentar</p>
    },
    {
        icon: <FaSave className="group-hover:fill-green-500 " />,
        title: <p className="group-hover:text-green-400" >Salvar</p>
    },
]


export const LikeComentsSaveButtons = () => {

    const handleEventsButtons = ({ title: { props: { children: title } }, icon}, {target}) => {
        switch (title) {
            case 'Amei': {
                console.log(icon)
                break;
            }
            case 'Comentar': {
                const boxFeedComments = target.closest("div#feed-recipe").querySelector('#feed-comment')
                const input = target.closest("div#feed-recipe").querySelector('#feed-comment #InputWriteComment')
                console.log(input)
                
                input.focus();
                boxFeedComments.classList.toggle("hidden")
                boxFeedComments.classList.toggle("flex")
                break;
            }
            case 'Salvar': {
                console.log(title)
                break;
            }
            default: {

            }
        }
    }

    return (
        <div className="flex w-5/6 mx-auto">
            {contents.map((content, index) =>
                <Button
                    event={(e) => handleEventsButtons(content, e)}
                    key={`${content.title}-${index}`}
                    customClass=
                    {"flex w-1/3 items-center justify-center gap-1 hover:bg-background rounded-md text-s1_3 hover:font-bold transition-all group"}
                >{content.icon} {content.title}</Button>)}
        </div>
    )
}


