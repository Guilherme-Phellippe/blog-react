import { FaHeart } from 'react-icons/fa';
import types from 'prop-types'
import { RiMessage2Fill } from 'react-icons/ri';


export const NumberLoved = ({ nmr_hearts, nmr_comments }) => {
    const positionJustify = nmr_comments ? 'justify-between' : 'justify-center';

    return (
        <div className={`"w-full flex ${positionJustify} items-center px-4"`}>
            <div className='flex'>
                <FaHeart className='fill-red-700 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-4 text-s1_5' />
                <FaHeart className='fill-red-700 -translate-x-8 text-s1_5' />
                <p className='-ml-4 text-s1_2'>{nmr_hearts} pessoas amaram essa receita</p>
            </div>
            {nmr_comments &&
                <p className='text-s1_2 flex items-center px-4'>
                    <RiMessage2Fill className="fill-blue-500 mr-2 text-s1_5" /> {nmr_comments} comentários
                </p>
            }
        </div>
    )
}

NumberLoved.propTypes = {
    nmr_hearts: types.number.isRequired
}