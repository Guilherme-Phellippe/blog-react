import { lazy, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../components/atoms/Button"
import { Candidate } from "../../components/molecules/Candidate"
import { TablePoll } from "../../components/organisms/TablePoll"
import { HomeProvider } from "../../contexts/Home/HomeProvider"
import { useRecipeApi } from "../../hooks/useApi"

import { IoIosCreate } from "react-icons/io"

import moment from "moment"

const Header = lazy(() => import("../../components/templates/Header/Header"))
const Footer = lazy(() => import("../../components/templates/Footer/Footer"))

export default function Poll() {

    const [updateListRecipe, setUpdateListRecipe] = useState(false)
    const [recipes, setRecipes] = useState([]);
    const refRecipeApi = useRef(useRecipeApi());

    useEffect(() => {
        (async () => {
            const { data } = await refRecipeApi.current.getAllRecipes();
            const filteredRecipeByDate = data.filter(recipe => {
                const createdAt = moment(recipe.createdAt).month() + "" + moment(recipe.createdAt).year();
                const currentDate = moment().month() + "" + moment().year();

                if (createdAt === currentDate) return recipe
                else return null
            })

            setRecipes(filteredRecipeByDate)
        })();
    }, [updateListRecipe]);

    recipes.sort((candidateA, candidateB) => {
        return candidateB.votes.length - candidateA.votes.length
    });

    return (
        <HomeProvider>
            <Header />
            <div className="w-[95%] md:w-5/6 mx-auto bg-white">
                <h2 className="p-4 text-s2 text-center text-color_red font-bold">Os mais votados:</h2>
                <div className="w-[95%] md:w-[60rem] mx-auto my-12 flex justify-center items-end">
                    {recipes.map((candidate, i) => {
                        return i < 3 && <Candidate
                            key={candidate.id}
                            position={i}
                            candidate={candidate}
                            recipes={recipes}
                        />
                    })}
                </div>
                <div className="flex flex-col items-center justify-center m-4">
                    <h3 className="w-[90%] md:w-2/3 p-4 text-center text-s1_7 md:text-s2 text-color_red font-bold ">Já pensou em ganhar prêmios fazendo oque você ama?</h3>
                    <Link to={'/create/?n='}>
                        <Button customClass={"btn-primary py-4 px-12 text-s1_5 m-4"}>Criar uma receita <IoIosCreate /></Button>
                    </Link>
                </div>
                {/* <div className="p-4">
                    <h2 className="text-s2 my-8 text-color_orange font-bold">Os mais votados vão receber:</h2>
                    <div className="flex h-40 items-center gap-8">
                        <span className="px-6 py-4 bg-color_orange rounded-full text-white text-s1_5">1°</span>
                        <img className="w-1/12 h-full object-contain cursor-pointer" src="https://http2.mlstatic.com/D_NQ_NP_843836-MLB53355798366_012023-W.webp" alt="premio um" />
                        <p className="text-s1_5">Kit de colher de silicone</p>
                    </div>
                    <div className="flex h-40 items-center gap-8">
                        <span className="px-6 py-4 bg-color_orange rounded-full text-white text-s1_5">2°</span>
                        <img className="w-1/12 h-full object-contain cursor-pointer" src="https://http2.mlstatic.com/D_NQ_NP_980767-MLB49687751966_042022-O.webp" alt="premio dois" />
                        <p className="text-s1_5">Kit de colher de silicone</p>
                    </div>
                    <div className="flex h-40 items-center gap-8">
                        <span className="px-6 py-4 bg-color_orange rounded-full text-white text-s1_5">3°</span>
                        <img className="w-1/12 h-full object-contain cursor-pointer" src="https://http2.mlstatic.com/D_NQ_NP_692005-MLB52818681594_122022-O.webp" alt="premio dois" />
                        <p className="text-s1_5">Kit de colher de silicone</p>
                    </div>
                </div> */}
                <TablePoll
                    setUpdateListRecipe={setUpdateListRecipe}
                    candidates={recipes} />
            </div>
            <Footer />
        </HomeProvider>
    )
}
