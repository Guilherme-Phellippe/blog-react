import { createListIngAdd } from "../../../scripts/createListIngAdd"

export default function PrepareMode({ prepareMode, type_prepare_mode }) {
    const newPrepareMode = prepareMode.split("<step>")

    return (
        <div className="w-full h-auto flex flex-col items-center p-0 md:p-4 mb-20">
            <h2 className='text-s2 text-color_orange text-center font-bold my-4 bg-color_orange/20 w-full p-4'>MODO DE PREPARO</h2>
            {
                createListIngAdd(type_prepare_mode, newPrepareMode).map((item) =>
                    <div key={item.name} className="w-full flex flex-col justify-center items-start">
                        {
                            item.name !== "Principal" &&
                            <h3 className="text-color_orange bg-color_orange/20 p-2 rounded-xl text-s1_7 font-bold">{item.name}:</h3>
                        }
                        <ul className='w-full p-0 md:p-4 flex flex-col'>
                            {
                                item.ing.map((i, index) =>
                                    <li
                                        key={i}
                                        className="text-s1_7 list-none text-color_text_black tracking-wide text-center md:text-left flex items-start gap-4 my-4 leading-10"
                                    >
                                        <span className="text-s1_5 bg-color_orange text-white px-4 py-3 rounded-full">{index + 1}</span>
                                        <p>{i}</p>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }

        </div>

    )
}