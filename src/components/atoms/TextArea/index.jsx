import React from "react"

export const TextArea = React.forwardRef(({ placeholder, id, ...restProps }, ref) => {
    return (
        <textarea
            id={id}
            ref={ref}
            className="w-full h-[100px] text-color_sub_text p-4 bg-background resize-none outline-none text-s1_2 rounded-xl mb-2"
            placeholder={placeholder}
            {...restProps}
        ></textarea>
    )
})