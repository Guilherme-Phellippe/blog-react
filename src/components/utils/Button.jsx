import types from 'prop-types'

import './button.css'

export const Button  = ({ text, typeButton = 'primary'}) => { 
    return(
        <button className={ typeButton }>{text}</button>
    )
}

Button.propTypes = {
    text: types.string.isRequired
}