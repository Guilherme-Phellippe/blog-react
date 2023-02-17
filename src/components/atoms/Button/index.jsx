import types from 'prop-types'

export const Button  = ({ id, children, event, customClass = 'btn-primary', style}) => { 

    return(
        <button id={id} className={ customClass } onClick={event} style={style}>{children}</button>
    )
}

Button.propTypes = {
    typeButton: types.string,
}