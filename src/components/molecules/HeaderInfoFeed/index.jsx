import moment from "moment"
import { useContext } from "react"
import { RiCloseCircleFill } from "react-icons/ri"
import { HomeContext } from "../../../contexts/Home/HomeProvider"
import { Img } from "../../atoms/Img"


export const HeaderInfoFeed = ({content: { user, createdAt, id}, onClick}) => {
    const { valueSearch } = useContext(HomeContext)

    return (
        <div className={`flex items-center px-4 h-[10%] ${valueSearch && "hidden"}`}>
            <div className="w-[35px] h-[35px] grid place-items-start rounded-full overflow-hidden">
                <Img 
                    className="w-full h-full object-cover"
                    src={user.photo} 
                    alt={user.name} />
            </div>
            <div className="w-[70%] h-full py-6 px-4 ">
                <h2 className="text-s1_2">{user.name}</h2>
                <p>{moment(createdAt).startOf('hour').fromNow()}</p>
            </div>
            <div className="w-1/5 flex justify-end items-center">
                <RiCloseCircleFill
                    id={id}
                    onClick={onClick}
                    className="cursor-pointer text-s2_5 fill-red-900 hover:fill-red-500 transition-all"
                />
            </div>
        </div >
    )
}