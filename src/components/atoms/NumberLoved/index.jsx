import { FaHeart } from 'react-icons/fa';
import types from 'prop-types'


export const NumberLoved = ({ nmr_hearts }) => {
    return (
        <div className="w-1/2 flex justify-center items-center">
            <FaHeart className='fill-red-700 translate-x-8 text-s1_5' />
            <FaHeart className='fill-red-700 translate-x-4 text-s1_5' />
            <FaHeart className='fill-red-700 text-s1_5' />
            <p className='ml-1 text-s1_2'>{nmr_hearts} pessoas amaram essa receita</p>
        </div>
    )
}

NumberLoved.propTypes = {
    nmr_hearts: types.number.isRequired
}