import { Link } from 'react-router-dom';
import { recipes } from '../../../../scripts/api/simulation';
import { Button } from '../../../helper/Button';
import { Candidate } from '../../../mid-level/Candidate';

export const PollRecipes = () => {

    recipes.sort((candidateA, candidateB) => {
        return candidateB.votes.length - candidateA.votes.length
    });

    return (
        <div className="w-full bg-white p-4 border-b-[1px] border-solid border-gray-300 flex flex-col">
            <h2 className='text-center p-4 text-s1_7'>Qual será a melhor receita do mês?</h2>
            <div className="w-full flex items-end justify-evenly my-4">
                {recipes.map((candidate, i) => {
                    return i < 3 && <Candidate
                        key={candidate.id}
                        position={i}
                        candidate={candidate}
                         />
                })}
            </div>
            <Link to={'/poll'}>
                <Button customClass={"btn-primary mx-auto block px-12 text-s1_2 mt-8"}>Ver votação</Button>
            </Link>
        </div>
    )
}