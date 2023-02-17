
import { BsEmojiHeartEyesFill } from 'react-icons/bs';
import categories from '../../../scripts/api/categories';
import { CardCategoriesSelect } from '../../organisms/CardCategoriesSelect';

export const ShowSelectedCategories = ({ categorySelect }) => {


    return (
        <div className="flex flex-col items-center w-[80%]">
            <h2 className='text-s2 text-color_primary p-4 font-bold'>{categorySelect}</h2>
            <h3 className='text-s1_5 py-2 gap-2 flex items-center'>Você vai amar essas receitas <BsEmojiHeartEyesFill className='text-s2 bg-red-700 rounded-full fill-yellow-400' /></h3>
            <div className="flex flex-wrap">
                {categories.length && categories.map(category =>
                    categorySelect === category.name_category 
                    && <CardCategoriesSelect key={category.id} category={category} />
                )
                }
            </div>
        </div>
    )
}