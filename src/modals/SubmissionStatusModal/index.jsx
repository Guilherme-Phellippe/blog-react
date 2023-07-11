import { forwardRef } from "react"
import { MdCheckCircle, MdError, MdLoop } from "react-icons/md";
import { Button } from "../../components/atoms/Button";


export default forwardRef(function SubmissionStatusModal({ statusSendRecipe }, ref){ 
    return(
        <div
                ref={ref}
                className="w-screen h-screen bg-black/20 fixed top-0 left-0 hidden place-items-center"
            >
                <div className="min-w-[300px] bg-white p-6 rounded-2xl">
                    <h2 className="text-s1_5 text-center p-4 mb-4">Status de compartilhamento</h2>
                    <div className="flex flex-col gap-4">
                        {
                            statusSendRecipe.map(status =>
                                <div key={status.name} className="flex justify-between">
                                    <p className="text-s1_2">{status.name}</p>
                                    <p>{
                                        status.status === 0 ?
                                            <MdLoop className="text-s1_2 fill-orange-500" /> :
                                            status.status === 1 ?
                                                <MdError className="text-s1_2 fill-red-500" /> :
                                                <MdCheckCircle className="text-s1_2 fill-green-700" />
                                    }</p>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-full flex justify-center">
                        <Button event={() => ref.current.classList.add("hidden")}>Fechar</Button>
                    </div>
                </div>
            </div>
    )
})