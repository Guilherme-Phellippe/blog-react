import * as Dialog from "@radix-ui/react-dialog";

/**
 * This modal component was created to be dinamic and to show in anywhere of application
 * @param {*} param0 
 * @returns
 * @type type: number, message: string, eventClose: function 
 */


export const DialogAlert = ({open, container: { type, message, eventClose}}) => {
    const TYPE_BORDER = type === 0 ? "border-red-600" : type === 1 ? "border-color_orange" : "border-green-700"
    const TYPE_COLOR_TEXT = type === 0 ? "text-red-600" : type === 1 ? "text-color_orange" : "text-green-700"
    const TYPE_COLOR_BG = type === 0 ? "bg-red-600/30" : type === 1 ? "bg-color_orange/30" : "bg-green-700/30"

    return (
        <Dialog.Root open={open.openModalAlert} onOpenChange={open.setModalAlert}>
            <Dialog.Portal>
                <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0 z-[998]' />
                <Dialog.Content className={`fixed z-[999] p-4 bg-white rounded-2xl w-4/5 md:w-auto max-w-none md:max-w-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] ${TYPE_BORDER}`}>
                    <Dialog.Title className={`text-center text-s1_3 p-4 ${TYPE_COLOR_TEXT} ${TYPE_COLOR_BG}`}>
                        BLOG TEM SABOR
                    </Dialog.Title>
                    <Dialog.Description className="text-s1_4 mt-6 px-8 pb-8 border-b-[1px]">{message}</Dialog.Description>
                    <Dialog.Close 
                        onClick={eventClose}
                        className='text-s1_2 block mx-auto my-6 text-color_sub_text border-[1px] p-2 px-6 border-color_text/40 rounded-2xl '
                    >OK</Dialog.Close>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}