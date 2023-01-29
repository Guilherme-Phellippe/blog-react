import { useEffect, useState } from 'react'
import { Button } from '../../utils/Button';
import './voterecipes.css'

export const VoteRecipes = ({ contents }) => {

    const [totalVotes, setTotalVotes] = useState(0);

    const recipes = [...contents].sort((x, y) => y.votes - x.votes)

    const handletotalVotes= () =>{
        recipes.forEach(recipe =>{
            setTotalVotes((r) => r += recipe.votes)
        })
    }

    useEffect(() =>{
        setTotalVotes(0)
        handletotalVotes();
        console.log(totalVotes)
    }, [totalVotes])

    return (
        <div className="vote-best-recipe">
            <h2>Qual será a melhor receita do mês?</h2>
            <div className="content-best-recipes">
                {recipes.length && recipes.map((recipe, index) => {
                    if (index < 3) return (
                        <div className="content-recipe">
                            <div className="box-img">
                                <img src={recipe.img} alt={recipe.name_recipe} />
                            </div>
                            {recipe.name_recipe}
                            <br />
                            <br />
                            {`${((recipe.votes / totalVotes) * 100).toFixed(1)}% dos votos`}
                        </div>
                    )
                })}
            </div>
            <Button text='Deixe seu voto' />
        </div>
    )
}