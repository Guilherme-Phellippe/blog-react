import { useEffect, useRef, useState } from 'react';
import { useRecipeApi } from '../../../hooks/useApi';


import { Img } from '../../atoms/Img';

export const Candidate = ({ position, candidate }) => {
    const refRecipeApi = useRef(useRecipeApi());
    const [recipes , setRecipes] = useState([])
    const [totalVotes, setTotalVotes] = useState(0);
    const height = position !== 0 ? 'h-[15rem]' : 'h-[17rem]'
    const orderStyle = position === 0 ? 'order-2' : position === 1 ? 'order-1' : 'order-3';


    useEffect(() => {
        (async function fetchData() {
            const { data } = await refRecipeApi.current.getAllRecipes();
            setRecipes(data)
        })();
    },[])

    useEffect(() => {
        setTotalVotes(0)
        recipes.forEach(candidate => {
            setTotalVotes(value => value + candidate.votes.length)
        });
    }, [recipes]);



    return (
        <div className={`${orderStyle} ${height} w-[30%] min-w-[110px] mx-auto flex flex-col justify-between relative border-[1px] border-solid border-color_second rounded-xl`}>
            <div className={`absolute -top-4 -left-4 px-4 py-2 rounded-[50%] bg-color_to_text_white text-white text-s1_2`}>
                {`${position + 1}°`}
            </div>
            <Img
                className="absolute right-0 bottom-0 w-[40px] h-[40px] object-cover rounded-[50%]"
                src={candidate.user.photo}
                alt={`foto de ${candidate.user.name}`}
                title={candidate.user.name}
            />
            <div className="w-full h-[70%] rounded-xl overflow-hidden">
                <Img
                    className="w-full h-full object-cover"
                    src={candidate.images_recipe[0].small}
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

