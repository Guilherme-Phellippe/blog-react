import React  from 'react';

export const Input = React.forwardRef(({ placeholder, label, icon, type = 'text', onChange,eventIcon, id, value, customWidthAndMargin, ...restProps }, ref) => {

    return (
        <div
            className={`${customWidthAndMargin} flex items-center border-[1px] border-solid hover:border-color_red bg-background rounded-xl relative`}>
            <label
                htmlFor={id}
                className={`text-s1_2 absolute -top-[60%] text-color_text`}
            >{label}</label>
            <input
                ref={ref}
                onChange={onChange}
                id={id}
                value={value}
                className="w-[85%] p-4 outline-none bg-transparent text-s1_3"
                type={type}
                placeholder={placeholder}
                {...restProps}
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

