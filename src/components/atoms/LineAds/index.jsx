export default function LineAds({ children }) {
    return (
        <div className="my-8">
            <div className="flex justify-center opacity-25">
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
                <span className="mx-2 -translate-y-1/2">Anúncio</span>
                <span className="w-full bg-zinc-900/50 h-[1px]"></span>
            </div>
            {children}
        </div>
    )
}