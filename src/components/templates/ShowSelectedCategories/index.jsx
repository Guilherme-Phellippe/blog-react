
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import { CardCategoriesSelect } from '../../organisms/CardCategoriesSelect';

export const ShowSelectedCategories = ({ categorySelect, categories }) => {

    return (
        <div className="flex flex-col items-center w-full md:w-[80%]">
            <h2 className='text-s2 text-color_orange p-4 font-bold'>{categorySelect}</h2>
            <h3 className='text-s1_5 py-2 gap-2 flex items-center'>Você vai amar essas receitas <BsEmojiHeartEyesFill className='text-s2 bg-red-700 rounded-full fill-yellow-400' /></h3>
            <div className="flex flex-wrap">
                {categories.map(category =>
                    categorySelect.toLowerCase().includes(category.name_category.toLowerCase())
                    && <CardCategoriesSelect key={category.id} category={category} />
                )
                }
            </div>
        </div>
    )
}