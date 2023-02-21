import React from "react"

export const TextArea = React.forwardRef(({ placeholder, label, id }, ref) => {
    return (
        <>
            <label className="w-full text-center text-s1_2 text-color_text">{label}</label>
            <textarea
                id={id}
                ref={ref}
                className="w-full h-full p-4 bg-background resize-none outline-none text-s1_2 rounded-xl"
                placeholder={placeholder}
            ></textarea>
        </>
    )
})