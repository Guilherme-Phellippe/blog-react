import { Link } from "react-router-dom";

export const ListRecipes = ({ recipe, styles = {} }) => {
    const date = new Date(recipe.createdAt).toLocaleDateString('pt-BR')

    return (
        <div className="recent_recipe" style={styles.recent_recipe}>
            <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
                <div className="content_img" style={styles.content_img}>
                    <img src={recipe.img} alt={recipe.name_recipe} style={styles.img}/>
                </div>
                <div className="content_info" style={styles.content_info}>
                    <h2>{recipe.name_recipe}</h2>
                    <p>por: <span>{recipe.author}</span> - {date}</p>
                </div>
            </Link>
        </div>
    )
}