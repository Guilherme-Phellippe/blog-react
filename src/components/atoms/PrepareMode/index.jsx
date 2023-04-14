export const PrepareMode = ({ prepareMode }) => {
    const newPrepareMode = prepareMode.split("<step>")

    return (
        <div className="w-full h-auto flex flex-col items-center p-4 mt-8">
            <h2 className='text-s2 text-color_orange text-center font-bold my-4 bg-color_orange/20 w-full p-4'>MODO DE PREPARO</h2>
            {
                newPrepareMode.map((mode, key) =>
                    <div key={key} className="flex justify-evenly items-start w-full mt-8 border-b-[1px] border-color_red/30 pb-4">
                        <span className="text-s1_5 bg-color_orange text-white px-4 py-3 rounded-full">{key + 1}</span>
                        <p className='w-5/6 text-s1_7 text-center md:text-left leading-10' dangerouslySetInnerHTML={{ __html: mode }}></p>
                    </div>
                )
            }
        </div>

    )
}