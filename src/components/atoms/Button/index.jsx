import types from 'prop-types'

import './styles.css'

export const Button  = ({ children, event, typeButton, style}) => { 
    return(
        <button className={ typeButton } onClick={event} style={style}>{children}</button>
    )
}

Button.propTypes = {
    typeButton: types.string,
}