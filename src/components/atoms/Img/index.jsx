export const Img = ({ src, alt, ...restProps }) => {
    return (
        <img
            className=""
            src={src}
            alt={alt}
            {...restProps} />
    )
}