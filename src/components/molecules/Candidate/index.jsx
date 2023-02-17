import { useEffect, useState } from 'react';

import { recipes } from '../../../scripts/api/simulation';
import { users } from '../../../scripts/api/users';

import { Img } from '../../atoms/Img';

export const Candidate = ({ position, candidate }) => {
    const [totalVotes, setTotalVotes] = useState(0);
    const height = position !== 0 ? 'h-[17rem]' : 'h-[20rem]'
    const orderStyle = position === 0 ? 'order-2' : position === 1 ? 'order-1' : 'order-3';

    useEffect(() => {
        setTotalVotes(0)
        recipes.forEach(candidate => {
            setTotalVotes(value => value + candidate.votes.length)
        });
    }, []);

    

    return (
        <div className={`${orderStyle} ${height} w-[28%] mx-auto flex flex-col justify-between relative border-[1px] border-solid border-color_second rounded-xl`}>
            <div className={`absolute -top-4 -left-4 px-4 py-2 rounded-[50%] bg-color_primary text-white text-s1_2`}>
                {`${position + 1}°`}
            </div>
            <Img
                className="absolute -right-[10%] bottom-0 w-[30%] rounded-[50%]"
                src={users.find(user => user.id === candidate.idUser)?.photo}
                alt={`foto de ${candidate.author}`}
                title={candidate.author}
            />
            <div className="w-full h-[70%] rounded-xl overflow-hidden">
                <Img
                    className="w-full h-full object-cover"
                    src={candidate.img}
                    alt={candidate.name_recipe}
                />
            </div>
            <h2 className="p-2 text-s1_2 w-full font-semibold " title={candidate.name_recipe}>{candidate.name_recipe.substring(0, 20) + "..."}</h2>
            <div className="flex flex-col">
                <h3 className="p-2 text-s1_2 w-full rounded-b-xl text-white font-bold bg-color_second">
                    {totalVotes > 0 ? ((candidate.votes.length / totalVotes) * 100).toFixed(2).replace('.', ',') + "% dos votos" : "Ainda não há votos sufientes"}
                </h3>
            </div>

        </div>
    )
}

