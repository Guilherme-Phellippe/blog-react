import { Helmet } from "react-helmet";

export default function PreviewRecipe({ title }) {
    console.log(document.head.querySelector("meta[property='og:title']"))
    return (
        <Helmet>
            <meta property="og:title" content={title} />
            <meta property="og:description" content={"dynamicDescription"} />
            <meta property="og:image" content={"https://via.placeholder.com/1000"} />
        </Helmet>
    )
}