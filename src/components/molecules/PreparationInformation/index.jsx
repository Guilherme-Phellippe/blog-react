import { BiChat, BiDish, BiHeart, BiHourglass } from 'react-icons/bi';

export default function PreparationInformation({ recipe }) {
    return (
        <div
            id='preparation-information'
            className="flex flex-wrap md:flex-nowrap w-full h-80 md:h-52 mt-8 bg-background relative rounded-t-3xl border-b-2 border-solid border-color_red"
        >
            <div className='w-1/2 md:w-1/4 h-1/2 md:h-full flex flex-col justify-center items-center relative border-b-[1px] border-black/10 md:border-none  after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiHourglass className='text-s3 text-color_orange' />
                <h3>PREPARO</h3>
                <h2 className='text-s2 mt-2 md:mt-0 text-color_orange'>{recipe.time} min</h2>
            </div>
            <div className='w-1/2 md:w-1/4 h-1/2 md:h-full flex flex-col justify-center items-center relative border-b-[1px] border-black/10 md:border-none after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiDish className='text-s3 text-color_orange' />
                <h3>RENDIMENTO</h3>
                <h2 className='text-s2 mt-2 md:mt-0 text-center text-color_orange'>{`${recipe.portion > 1 ? recipe.portion + " porções" : recipe.portion + " porção"}`}</h2>
            </div>
            <div className='w-1/2 md:w-1/4 h-1/2 md:h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiChat className='text-s3 text-color_orange' />
                <h3>VISUALIZAÇÕES</h3>
                <h2 className='text-s2 mt-2 md:mt-0 text-color_orange'>{Number(recipe.nmr_eyes) + 1}</h2>
            </div>
            <div className='w-1/2 md:w-1/4 h-1/2 md:h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiHeart className='text-s3 text-color_orange' />
                <h3>FAVORITOS</h3>
                <h2 className='text-s2 mt-2 md:mt-0 text-color_orange'>{recipe.nmr_saved.length}</h2>
            </div>
        </div>
    )
}