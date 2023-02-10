import types from 'prop-types'

import './styles.css'

export const Button  = ({ children, event, customClass = 'btn-primary', style}) => { 

    return(
        <button className={ customClass } onClick={event} style={style}>{children}</button>
    )
}

Button.propTypes = {
    typeButton: types.string,
}