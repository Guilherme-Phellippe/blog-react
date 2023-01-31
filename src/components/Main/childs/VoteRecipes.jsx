import { useEffect, useState } from 'react'
import { Button } from '../../utils/Button';
import './voterecipes.css'

export const VoteRecipes = ({ contents }) => {

    const [totalVotes, setTotalVotes] = useState(0);

    const recipes = [...contents].sort((x, y) => y.votes - x.votes)

    useEffect(() =>{
        setTotalVotes(0)
        recipes.forEach(recipe =>{
            setTotalVotes((r) => r += recipe.votes)
        })
    }, [totalVotes, recipes]);


    return (
        <div className="vote-best-recipe">
            <h2>Qual será a melhor receita do mês?</h2>
            <div className="content-best-recipes">
                {recipes.length && recipes.map((recipe, index) => {
                    if (index < 3) return (
                        <div className="container-recipe-votes">
                            <h2>{recipe.name_recipe}</h2>
                            <div className="box-img">
                                <img src={recipe.img} alt={recipe.name_recipe} />
                                <img className='avatar-user' src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt="" />
                            </div>
                            <p>{`${((recipe.votes / totalVotes) * 100).toFixed(1)}% dos votos`}</p>
                            
                        </div>
                    )
                })}
            </div>
            <Button text='Ver votação' />
        </div>
    )
}