import types from 'prop-types'

export const Input = ({ placeholder, icon , type , onChange, id, value, ref, size = 1}) => {
    const width = size === 0 ? 'w-[25%]' : size === 1 ? 'w-[51%]': size === 2 ? 'w-[75%]' : 'w-[100%]';


    return (
        <div className={`${width} flex items-center border-[1px] border-solid hover:border-color_second m-2 bg-background rounded-xl`}>
            <input
                ref={ref}
                onChange={onChange}
                id={id}
                value={value}
                className="w-[85%] p-4 outline-none bg-transparent text-s1_2"
                type={type}
                placeholder={placeholder} />
            <div className="w-[15%] h-full flex justify-center items-center">
                {icon}
            </div>
        </div>
    )
}

Input.propTypes ={
    size: types.number
}