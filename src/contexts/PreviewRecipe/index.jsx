import { Helmet } from "react-helmet";

export default function PreviewRecipe({ title }) {
    return (
        <Helmet>
            {document.head.querySelector("meta[property=og:title]").content = title}
        </Helmet>
    )
}