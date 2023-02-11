export const Input = ({ placeholder, icon , type , onChange, id, size = 'medium'}) => {
    const width = size === 'small' ? 'w-[25%]' : size === "medium" ? 'w-[51%]':'w-[100%]';


    return (
        <div className={`${width} flex items-center border-[1px] border-solid hover:border-color_second m-2 bg-background rounded-xl`}>
            <input
                onChange={onChange}
                id={id}
                className="w-[85%] p-4 outline-none bg-transparent text-s1_2"
                type={type}
                placeholder={placeholder} />
            <div className="w-[15%] h-full flex justify-center items-center">
                {icon}
            </div>
        </div>
    )
}