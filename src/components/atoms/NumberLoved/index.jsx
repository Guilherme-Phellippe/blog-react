import { FaHeart } from 'react-icons/fa';
import types from 'prop-types'
import { RiMessage2Fill } from 'react-icons/ri';


export const NumberLoved = ({ nmr_hearts, nmr_comments }) => {
    const positionJustify = nmr_comments ? 'justify-between' : 'justify-center';

    const handleClickComment = ({ target }) =>{
        const boxFeedComments = target.closest("div#feed-recipe").querySelector('#feed-comment')
        boxFeedComments.classList.toggle("hidden")
        boxFeedComments.classList.toggle("flex")
    }


    return (
        <div className={`"w-full flex ${positionJustify} items-center px-4"`}>
            <div className='flex items-center'>
                <FaHeart className='fill-red-700 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-4 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-8 text-s1_5' />
                <p className='-ml-4 text-s1_2'>{nmr_hearts} {nmr_hearts <= 1 ? "pessoa amou essa receita": "pessoas amaram essa receita"}</p>
            </div>
            {!!nmr_comments &&
                <p data-id="total_nmr_comments" onClick={handleClickComment} className='text-s1_2 flex items-center px-4 hover:underline cursor-pointer'>
                    <RiMessage2Fill className="fill-blue-500 mr-2 text-s1_5" /> 
                    <span className='mr-1'>{nmr_comments}</span>comentário(s)
                </p>
            }
        </div>
    )
}

NumberLoved.propTypes = {
    nmr_hearts: types.number.isRequired
}