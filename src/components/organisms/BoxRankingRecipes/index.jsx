import { useState } from 'react';
import { ListRecipes } from '../../molecules/ListRecipes';
import './styles.css'

export const BoxRankingRecipes = ({ title, ranking }) => {
    const [limitRecipes, setLimitRecipes] = useState(5)

    return (
        <div className="container-ranking">
            <h2>{title}</h2>
            {
                 ranking.length && ranking.map((recent, index) => {
                    if (index < limitRecipes) if (index < 8) return (
                        <ListRecipes key={recent.id} recipe={recent} />
                    )
                    return [];
                })
            }
            {ranking.length > limitRecipes ? <p onClick={() => setLimitRecipes(ranking.length)}>Veja mais</p> : ''}
        </div>
    )
}