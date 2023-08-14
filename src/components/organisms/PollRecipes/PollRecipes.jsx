import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeApi } from '../../../hooks/useApi';
import { Button } from '../../atoms/Button';
import { Candidate } from '../../molecules/Candidate';

import timer from '../../../scripts/formatTime';

export default function PollRecipes() {
    const [recipes, setRecipes] = useState([]);
    const refRecipeApi = useRef(useRecipeApi());

    useEffect(() => {
        (async () => {
            const { data } = await refRecipeApi.current.getAllRecipes();
            const filteredRecipeByDate = data.filter(recipe => {
                if (timer(recipe.createdAt).isSameMonth()) return recipe
                else return null
            })

            setRecipes(filteredRecipeByDate)
        })()
    }, [])

    recipes.sort((candidateA, candidateB) => {
        return candidateB.votes.length - candidateA.votes.length
    });

    return (
        <div className="w-full bg-white p-4 border-b-[1px] border-solid border-gray-300 flex flex-col">
            <h2 className='text-center mb-8 p-4 text-s2'>Qual será a melhor receita do mês?</h2>
            <div className="w-full flex items-end justify-evenly my-4">
                {recipes.map((candidate, i) => {
                    return i < 3 && <Candidate
                        key={candidate.id}
                        position={i}
                        candidate={candidate}
                        recipes={recipes}
                    />
                })}
            </div>
            <Link to={'/poll'}>
                <Button customClass={"btn-primary mx-auto block px-12 text-s1_2 mt-8"}>Ver votação</Button>
            </Link>
        </div>
    )
}
