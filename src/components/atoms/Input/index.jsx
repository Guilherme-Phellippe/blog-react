import React from 'react';

export const Input = React.forwardRef(({ id, icon, label, eventIcon, customWidthAndMargin, ...restProps }, ref) => {

    return (
        <div
            className={`${customWidthAndMargin} flex items-center border-[1px] border-solid hover:border-color_red bg-background rounded-xl relative`}
        >
            <label
                htmlFor={id}
                className={`text-s1_2 absolute -top-[60%] text-color_text_black`}
            >{label}</label>
            <input
                ref={ref}
                id={id}
                className="w-[85%] p-4 outline-none bg-transparent text-s1_3"
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

