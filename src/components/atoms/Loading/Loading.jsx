export const Loading = () => {
    return (
        <div className={`flex gap-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 bg-[#fff5]`}>
            <div className="w-3 h-3 max-w-[15px] max-h-[15px] rounded-full bg-color_orange animate-loading-1"></div>
            <div className="w-3 h-3 max-w-[15px] max-h-[15px] rounded-full bg-color_orange animate-loading-2"></div>
            <div className="w-3 h-3 max-w-[15px] max-h-[15px] rounded-full bg-color_orange animate-loading-3"></div>
        </div>
    )
}