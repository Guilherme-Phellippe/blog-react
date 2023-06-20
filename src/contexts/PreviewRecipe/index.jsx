import { Helmet } from "react-helmet";

export default function PreviewRecipe({ title }) {
    console.log(document.head.querySelector("meta"))
    return (
        <Helmet>
            {document.head.querySelector("meta")}
        </Helmet>
    )
}