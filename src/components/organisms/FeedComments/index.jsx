import { RiSendPlaneFill } from "react-icons/ri"
import { users } from "../../../scripts/api/users"
import { Input } from "../../helper/Input"

export const FeedComments = ({ comment, content }) => {
    return (
        <div className="w-full my-4 flex flex-col items-center px-4 bg-black ">
            <div className="flex">
                <div className="w-[10%] overflow-hidden rounded-full">
                    <img className="w-full h-full object-cover" src={users.find(user => user.id === comment.idUser).photo} alt={content.author} />
                </div>
                <div className="w-full px-4 py-2 rounded-3xl m-2 flex flex-col bg-background">
                    <h2 className="font-bold text-s1_1">{users.find(user => user.id === comment.idUser).name}</h2>
                    <p className="text-s1_1 ml-4 mt-2">{comment.ask}</p>
                </div>
            </div>
            {comment.answer ?
                <div className="w-3/4 flex items-center">
                    <div className="w-[8%] overflow-hidden rounded-full">
                        <img className="w-full h-full object-cover" src={users.find(user => user.id === content.idUser)?.photo} alt={content.author} />
                    </div>
                    <div className="w-full px-4 py-2 rounded-3xl m-2 flex flex-col bg-background">
                        <h2 className="font-bold text-s1_1">{content.author}</h2>
                        <p className="text-s1_1 ml-4 mt-2">{comment.answer}</p>
                    </div>
                </div>
                :
                <div className="w-full ml-[15%] bg-white flex">
                    <div className="w-[8%] overflow-hidden rounded-full">
                        <img className="w-full h-full object-cover" src="https://via.placeholder.com/100" alt={content.author} />
                    </div>
                    <Input
                        placeholder={`responda o comentário á ${users.find(user => user.id === comment.idUser).name}...`}
                        icon={<RiSendPlaneFill className="text-s1_5 cursor-pointer fill-blue-500"/>}
                        size={2}
                    />
                </div>

            }
        </div>)
}