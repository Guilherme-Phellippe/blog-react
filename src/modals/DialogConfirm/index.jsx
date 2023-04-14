import * as AlertDialog from '@radix-ui/react-alert-dialog';


/**
 * This modal component was created to be dinamic and to show in anywhere of application
 * @param {*} param0 
 * @returns
 * @type type: number,button: object:{ icon, title, event } message: string
 */

export const DialogConfirm = ({ open, container: { type, button, message } }) => {
    const TYPE_BORDER = type === 0 ? "border-red-600" : type === 1 ? "border-color_orange" : "border-green-700"
    const TYPE_COLOR_TEXT = type === 0 ? "text-red-600" : type === 1 ? "text-color_orange" : "text-green-700"
    const TYPE_COLOR_BG = type === 0 ? "bg-red-600" : type === 1 ? "bg-color_orange" : "bg-green-700"

    return (
        <AlertDialog.Root open={open.openModalDialog} onOpenChange={open.setModalDialog}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className='w-screen h-screen bg-black/80 fixed z-10 inset-0' />
                <AlertDialog.Content className={`fixed z-20 p-4 bg-white rounded-2xl w-4/5 md:w-auto max-w-none md:max-w-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] ${TYPE_BORDER}`}>
                    <AlertDialog.Title className={`text-center text-s1_3 p-4 ${TYPE_COLOR_TEXT} ${TYPE_COLOR_BG}/30`}>
                        BLOG TEM SABOR
                    </AlertDialog.Title>
                    <AlertDialog.Description className="text-s1_4 my-8 p-4">{message}</AlertDialog.Description>
                    <div className="flex justify-around mt-6 border-t-[1px] py-8">
                        <AlertDialog.Cancel className='text-s1_2 text-color_sub_text border-[1px] p-2 border-color_text/40 rounded-2xl '> {button ? "Cancelar" : "Entendi"} </AlertDialog.Cancel>
                        {
                            button &&
                            <AlertDialog.Action className={`btn-primary text-s1_2 gap-2 px-4 ${TYPE_COLOR_BG} `} onClick={button?.event}>
                                {button?.icon}
                                {button?.title}
                            </AlertDialog.Action>
                        }
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    )
}

