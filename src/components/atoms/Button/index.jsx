export const Button  = ({ id, children, event, customClass = 'btn-primary', style, ...restProps}) => { 

    return(
        <button 
            id={id} 
            className={ customClass } 
            onClick={event} 
            style={style}
            {...restProps}
        >{children}</button>
    )
}