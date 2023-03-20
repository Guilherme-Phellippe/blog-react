import { RiSendPlaneFill } from "react-icons/ri"
import { users } from "../../../scripts/api/users"
import { Input } from "../../atoms/Input"
import { Img } from "../../atoms/Img"

export const FeedComments = ({ comment }) => {
    return (
        <div  className="w-full my-4 flex flex-col items-center">
            <div className="w-full h-1/2 flex items-center px-4">
                <div className="w-[10%] h-full">
                    <Img
                        className="w-full h-full rounded-full object-cover"
                        src={comment.user.photo}
                        alt={comment.user.name}
                    />
                </div>
                <div className="w-full px-4 py-2 rounded-3xl m-2 flex flex-col bg-background">
                    <h2 className="font-bold text-s1_1">{comment.user.name}</h2>
                    <p className="text-s1_1 ml-4 mt-2">{comment.comment}</p>
                </div>
            </div>
            {!!comment.answer.length ?
                <div className="w-3/4 h-1/2 flex items-center">
                    <div className="w-[8%] h-[80%] overflow-hidden rounded-full">
                        <img className="w-full h-full object-cover" src={comment.user.photo} alt={comment.user.name} />
                    </div>
                    <div className="w-full px-4 py-2 rounded-3xl m-2 flex flex-col bg-background">
                        <h2 className="font-bold text-s1_1">{comment.user.name}</h2>
                        <p className="text-s1_1 ml-4 mt-2">{comment.answer}</p>
                    </div>
                </div>
                :
                <div className="w-3/4 h-1/2 flex items-center bg-white">
                    <div className="w-[8%] h-[80%] overflow-hidden rounded-full">
                        <Img
                            className="w-full h-full rounded-full object-cover"
                            src="https://via.placeholder.com/100"
                            alt={comment.user.name}
                        />
                    </div>
                    <Input
                        placeholder={`responda o comentário á ${comment.user.name}...`}
                        icon={<RiSendPlaneFill className="text-s1_5 cursor-pointer fill-blue-500" />}
                        size={2}
                    />
                </div>

            }
        </div>)
}