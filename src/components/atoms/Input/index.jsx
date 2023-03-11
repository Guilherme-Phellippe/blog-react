import React  from 'react';

export const Input = React.forwardRef(({ placeholder, label, icon, type = 'text', onChange,eventIcon, id, value, size = 1 }, ref) => {
    const width = size === 0 ? 'w-[25%]' : size === 1 ? 'w-[51%]' : size === 2 ? 'w-[75%]' : 'w-[100%]';

    return (
        <div
            className={`${width} mt-8 flex items-center border-[1px] border-solid hover:border-color_second m-2 bg-background rounded-xl relative`}
        >
            <label
                htmlFor={id}
                className={`text-s1_1 absolute -top-1/2 text-color_text`}
            >{label}</label>
            <input
                ref={ref}
                onChange={onChange}
                id={id}
                value={value}
                className="w-[85%] p-4 outline-none bg-transparent text-s1_2"
                type={type}
                placeholder={placeholder}
            />
            <div 
                onClick={eventIcon}
                className="w-[15%] h-full flex justify-center items-center"
            >
                {icon}
            </div>
        </div>
    )
})

