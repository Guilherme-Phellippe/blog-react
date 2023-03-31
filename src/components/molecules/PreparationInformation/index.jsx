import { BiChat, BiDish, BiHeart, BiHourglass } from 'react-icons/bi';


export const PreparationInformation = ({recipe}) => {
    return (
        <div className="flex w-full h-52 mt-8 bg-background relative rounded-t-3xl border-b-2 border-solid border-color_second">
            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiHourglass className='text-s3 text-color_primary' />
                <h3>PREPARO</h3>
                <h2 className='text-s1_7 md:text-s2 text-color_primary'>{recipe.time} min</h2>
            </div>
            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiDish className='text-s3 text-color_primary' />
                <h3>RENDIMENTO</h3>
                <h2 className='text-s1_7 md:text-s2 text-center text-color_primary'>{`${recipe.portion > 1 ? recipe.portion + " porções":recipe.portion+" porção"}`}</h2>
            </div>
            <div className='w-1/4 h-full flex flex-col justify-center items-center relative after:absolute after:right-0 after:w-px after:h-1/2 after:mt-1/4 after:opacity-10 after:bg-black'>
                <BiHeart className='text-s3 text-color_primary' />
                <h3>FAVORITOS</h3>
                <h2 className='text-s1_7 md:text-s2 text-color_primary'>{recipe.nmr_saved.length}</h2>
            </div>
            <div className='w-1/4 h-full flex flex-col justify-center items-center'>
                <BiChat className='text-s3 text-color_primary' />
                <h3>COMENTÁRIOS</h3>
                <h2 className='text-s1_7 md:text-s2 text-color_primary'>{recipe.comments.length}</h2>
            </div>
        </div>
    )
}