
import { useState } from "react"
import { MdArrowDropDown, MdArrowDropUp, MdCheckBox, MdDelete, MdMessage } from "react-icons/md"
import { formatTextLong } from "../../../scripts/formatTextLong";

export const Notification = ({ notification: { notification } }) => {
    const [showMessage , setShowMessage ] = useState(false)
    const [read, setRead] = useState(notification.read);


    const handleReadMessage = () => {
        setRead(v => !v)
    }

    return (
        <div className={`w-full flex-col border-[1px] ${read ? "border-color_sub_text" : "border-color_second"}`}>
            <div className={`w-full h-36 border-[1px] flex justify-evenly items-center cursor-pointer`}>
                <div className="w-1/5 grid place-items-center border-r-[1px]">
                    <MdMessage className={`text-s2_5 ${read ? "text-color_sub_text" : "text-color_second"}`} />
                </div>
                <div onClick={() => setShowMessage(msg => !msg)} className="w-3/5 flex justify-between">
                    <p className={`text-s1_5 ${!read && 'text-color_primary'}`}>{formatTextLong(notification.title, 30)}</p>
                    {showMessage ? <MdArrowDropUp className="text-s2_5" /> : <MdArrowDropDown className="text-s2_5" />}
                </div>
                <div className="w-1/5 flex justify-center gap-8">
                    <p
                        onClick={handleReadMessage}
                        className="flex flex-col justify-center items-center"
                    >
                        <MdCheckBox className={`text-s2  ${read ? "fill-green-800" : "fill-color_sub_text"}`} /> Marcar como lida
                    </p>
                    <p className="flex flex-col justify-center items-center"><MdDelete className="text-s2 fill-red-700" />Excluir </p>
                </div>
            </div>
            {showMessage &&
                <div className="w-full flex p-8">
                    <p className="text-s1_3 text-center">{ notification.message }</p>
                </div>
            }
        </div>
    )
}