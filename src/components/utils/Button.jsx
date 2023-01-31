import types from 'prop-types'

import './button.css'

export const Button  = ({ text, event, typeButton = 'primary'}) => { 
    return(
        <button className={ typeButton } onClick={event}>{text}</button>
    )
}

Button.propTypes = {
    text: types.string.isRequired
}