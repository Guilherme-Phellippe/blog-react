import './boxrecentrecipe.css'

export const BoxRecentRecipe = ({ recent }) => {
    const { img, name_recipe, author, createdAt } = recent;
    const date = new Date(createdAt)
    const dateFormated = date.toLocaleDateString() + " " + date.toLocaleTimeString()

    return (
        <div className="recent-recipe">
            <div className="content-img">
                <img src={img} alt={name_recipe} />
            </div>
            <div className="content-info">
                <h2>{name_recipe}</h2>
                <p>por: <span>{author}</span> - {dateFormated}</p>
            </div>
        </div>
    )
}