export const Loading = () => {
    return (
        <div className={`flex gap-1 justify-center absolute top-0 left-0 right-0 bottom-0 bg-[#fff5]`}>
            <div className="w-5 h-5 max-w-[40px] max-h-[40px] rounded-full border-[2px] bg-color_orange animate-loading-1"></div>
            <div className="w-5 h-5 max-w-[40px] max-h-[40px] rounded-full border-[2px] bg-color_orange animate-loading-2"></div>
            <div className="w-5 h-5 max-w-[40px] max-h-[40px] rounded-full border-[2px] bg-color_orange animate-loading-3"></div>
        </div>
    )
}