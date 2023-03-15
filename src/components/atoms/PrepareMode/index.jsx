export const PrepareMode = ({ prepareMode }) => {
    return (
        <div className="w-full h-auto flex flex-col items-center p-4 mt-8">
            <h2 className='text-s2 text-color_primary font-bold'>MODO DE PREPARO</h2>
            <p className='text-s1_5 mt-8 leading-10 first-letter:ml-12' dangerouslySetInnerHTML={{__html: prepareMode}}></p>
        </div>

    )
}