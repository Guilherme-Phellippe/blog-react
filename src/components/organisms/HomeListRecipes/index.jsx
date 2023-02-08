import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

export const ListRecipes = ({ title, ranking }) => {
    const date = new Date(ranking.createdAt)
    const dateFormated = date.toLocaleString('pt-BR');
    const [limitRecipes, setLimitRecipes] = useState(5)

    return (
        <div className="container-ranking">
            <h2>{title}</h2>
            {ranking.length && ranking.map((recent, index) => {
                if (index < limitRecipes) if (index < 8) return (
                    <Link key={recent.id} to={`/recipe/${recent.id}`}>
                        <div className="recent-recipe">
                            <div className="content-img">
                                <img src={recent.img} alt={recent.name_recipe} />
                            </div>
                            <div className="content-info">
                                <h2>{recent.name_recipe}</h2>
                                <p>por: <span>{recent.author}</span> - {dateFormated}</p>
                            </div>
                        </div>
                    </Link>
                )
                return [];
            })}
            {ranking.length > limitRecipes ? <p onClick={() => setLimitRecipes(ranking.length)}>Veja mais</p> : ''}
        </div>
    )
}