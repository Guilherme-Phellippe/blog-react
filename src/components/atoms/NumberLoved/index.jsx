import { FaHeart } from 'react-icons/fa';
import types from 'prop-types'
import { RiMessage2Fill } from 'react-icons/ri';
import { formatNumberLong } from '../../../scripts/formatNumberLong';


export const NumberLoved = ({ nmr_hearts, nmr_comments }) => {

    const handleClickComment = ({ target }) => {
        const boxFeedComments = target.closest("div#feed-recipe").querySelector('#feed-comment')
        boxFeedComments.classList.toggle("hidden")
        boxFeedComments.classList.toggle("flex")
    }


    return (
        <div className={`"w-full flex justify-between items-center px-2"`}>
            <div className='flex items-center'>
                <FaHeart className='fill-red-700 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-4 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-8 text-s1_5' />
                <p className='-ml-6 text-s1_3 relative group'>
                    {formatNumberLong(nmr_hearts)} {nmr_hearts.toString().length < 4 ? nmr_hearts <= 1 ? "Curtida" : "Curtidas":''}
                    <span className='hidden group-hover:block absolute bottom-full left-1 text-s1 border px-2 py-1 bg-gray-400 text-white rounded-md'>{nmr_hearts}</span>
                </p>
            </div>
            {!!nmr_comments &&
                <p data-id="total_nmr_comments" onClick={handleClickComment} className='text-s1_2 flex items-center px-4 hover:underline cursor-pointer'>
                    <RiMessage2Fill className="fill-blue-500 mr-2 text-s1_5" />
                    <span className='mr-1'>{formatNumberLong(nmr_comments)}</span>comentário(s)
                </p>
            }
        </div>
    )
}

NumberLoved.propTypes = {
    nmr_hearts: types.number.isRequired
}