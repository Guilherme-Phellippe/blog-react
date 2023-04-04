import moment from "moment"
import { useEffect, useRef, useState } from "react"
import { FaSadTear, FaSearch } from "react-icons/fa"
import { Link, useSearchParams } from "react-router-dom"
import { useRecipeApi } from "../../../hooks/useApi"
import { Button } from "../../atoms/Button"
import { Input } from "../../atoms/Input"
import { Loading } from "../../atoms/Loading/Loading"

export const TablePoll = ({ candidates: candidatesRecipe, setUpdateListRecipe }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const refVotesApi = useRef(useRecipeApi())
    const [search, setSearch] = useState('');
    const [newCandidates, setNewCandidates] = useState([]);
    const [alreadyVoted, setAlreadyVoted] = useState(false)
    const [totalVotes, setTotalVotes] = useState(0);
    const [recipesPerPage, setRecipesPerPage] = useState(10);
    const refTablePoll = useRef();
    const [qs, setQs] = useSearchParams();
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        let nameForVote = qs.get('name')

        if (nameForVote) {
            setSearch(nameForVote);
            setQs({})
            refTablePoll.current.scrollIntoView({ behavior: 'smooth' })
        }

    }, [qs, setQs])


    useEffect(() => {
        (async () => {
            if (token) {
                const { data } = await refVotesApi.current.verifyExistVote(token.id)
                setAlreadyVoted(data)
            }
        })();
    }, [token]);



    useEffect(() => {
        setTotalVotes(0)
        candidatesRecipe.forEach(candidate => {
            setTotalVotes(total => total + candidate.votes.length)
        })
    }, [candidatesRecipe])

    useEffect(() => {
        var newCandidates = search ? candidatesRecipe.filter(candidate =>
            candidate.name_recipe.toLowerCase().includes(search.toLowerCase())
            ||
            candidate.user.name.toLowerCase().includes(search.toLowerCase())
            ||
            Number(candidate.id) === Number(search))
            : candidatesRecipe.filter(candidate => {
                const createdDate = moment(candidate.createdAt).month() + "" + moment(candidate.createdAt).year();
                const currenntDate = moment().month() + "" + moment().year();

                if (createdDate === currenntDate) return candidate
                else return null
            });

        setNewCandidates(() => newCandidates);
    }, [search, candidatesRecipe]);


    const handleVoteUser = async ({ currentTarget }) => {
        if (token) {
            setLoading(true)
            const { data } = await refVotesApi.current.verifyExistVote(token.id)
            if (!data) {
                const data = await refVotesApi.current.updateVotesRecipe({ userId: token.id, recipeId: currentTarget.id })
                if (data.status === 204) {
                    setUpdateListRecipe(true)
                    setAlreadyVoted(true)
                    alert("você votou com sucesso!")
                }
            } else alert("Essa receita não pode ser mais votada ou você já usou seu voto")
            setSearch('')
            setLoading(false)
        } else alert("Você precisa criar uma conta para poder votar!")
    }


    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <h2 className="text-s2 my-4 text-color_primary font-bold">Vote na sua receita preferida:</h2>
            <div className="flex justify-center w-full my-8">
                <Input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    icon={<FaSearch className="text-s1_5  fill-color_primary" />}
                    placeholder="Busque sua receita favorita..."
                    customWidthAndMargin="w-full"
                />
            </div>
            <table className="w-full border-[1px] border-solid" ref={refTablePoll}>
                <thead>
                    <tr className="bg-color_primary text-white text-s1_3">
                        <th className="py-4">#</th>
                        <th>Nome</th>
                        <th className="hidden md:block">Author</th>
                        <th className="hidden md:block">Data</th>
                        <th>Votos</th>
                        <th>Receita</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {newCandidates.length ?
                        newCandidates.map((candidate, index) =>
                            index < recipesPerPage &&
                            <tr
                                key={candidate.id}
                                className='text-center cursor-pointer hover:bg-background border-b-[1px] border-solid'
                            >
                                <td className={`py-4 text-s1_2 p-2 ${index < 3 && !search ? 'bg-green-600 text-white font-bold' : ''}`}>{index + 1}°</td>
                                <td className="py-4 text-s1_2">{candidate.name_recipe}</td>
                                <td className="py-4 text-s1_2 hidden md:block">{candidate.user.name}</td>
                                <td className="py-4 text-s1_2 hidden md:block">{moment(candidate.createdAt).startOf('hour').fromNow()}</td>
                                <td className="py-4 text-s1_2">{
                                    totalVotes > 0 ? candidate.votes.length > 0
                                        ? ((candidate.votes.length / totalVotes) * 100).toFixed(2).replace('.', ',') + '%'
                                        : 's/v'
                                        : '0'}
                                </td>
                                <td className="py-4 text-s1_2 flex justify-center">
                                    <Link to={`/recipe/${candidate.id}`}>
                                        <Button customClass="btn-primary bg-color_second">Ver</Button>
                                    </Link>
                                </td>
                                <td className="py-4 text-s1_2 relative">
                                    {
                                        loading ?
                                            <Loading />
                                            :
                                            !alreadyVoted ?
                                                <Button
                                                    id={candidate.id}
                                                    event={handleVoteUser}
                                                >Votar</Button> : <p>Voto realizado</p>
                                    }
                                </td>
                            </tr>
                        )
                        : <tr className="text-s1_5 text-center">
                            <td className="p-8 flex items-center gap-4 justify-center">Não há receitas disponíveis <FaSadTear className="fill-color_primary" /></td>
                        </tr>
                    }

                </tbody>

            </table>
            {newCandidates.length > recipesPerPage && <Button event={() => setRecipesPerPage(v => v + 10)} customClass="btn-primary mt-8">Carregar mais receitas</Button>}
        </div>
    )
}