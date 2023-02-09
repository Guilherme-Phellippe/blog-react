export const CarouselMidiasContent = ({img , name_recipe}) => {
    return (
        <div className="w-full h-110 mt-4 mx-auto rounded-3xl overflow-hidden">
            <img className='w-full h-full object-cover' src={img} alt={name_recipe} />
        </div>
    )
}