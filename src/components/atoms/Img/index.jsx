export const Img = ({ src, alt , ...restProps}) => { 
    return(
        <img src={src} alt={alt} {...restProps}/>
    )
}