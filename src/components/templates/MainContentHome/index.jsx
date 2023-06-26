import { useCallback, useContext, useEffect, useState, useRef, lazy, Suspense } from "react";

import { HomeContext } from '../../../contexts/Home/HomeProvider'

import { MdArrowDropDown } from 'react-icons/md'

import { Button } from "../../atoms/Button";
import { useFeedApi } from "../../../hooks/useApi";

import { smartSearch } from "../../../scripts/smartSearch";
import { Loading } from "../../atoms/Loading/Loading";
import MenuMobile from "../MenuMobile";

const MostViewedRecipesContainer = lazy(() => import("../../organisms/MostViewedRecipesContainer"))
const Adsense = lazy(() => import("../../molecules/Adsense"))
const ColumnLeftMainHome = lazy(() => import("../../organisms/ColumnLeftMainHome"))
const ColumnRightMainHome = lazy(() => import("../../organisms/ColumnRightMainHome"))
const Feed = lazy(() => import("../../organisms/Feed"))
const PollRecipes = lazy(() => import("../../organisms/PollRecipes/PollRecipes"))
const CreateFeed = lazy(() => import("../../organisms/CreateFeed/CreateFeed"))

export default function MainContentHome() {
    //useContext
    const { valueSearch, user } = useContext(HomeContext);
    //useState
    const [postPerPage, setPostPerPage] = useState(10);
    const [recipes, setRecipes] = useState([])
    const [feed, setFeed] = useState(recipes);
    const [showContentSection, setContentSection] = useState(false)
    //useRef
    const feedApi = useRef(useFeedApi());

    //Search data in bd and fill recipes and user
    useEffect(() => {
        // REQ TO API TO SEARCH ALL FEEDS
        (async () => {
            const { data: recipesData } = await feedApi.current.getAllFeed();
            if (recipesData) setRecipes(recipesData)
            else localStorage.removeItem('token')
            document.title = "Tem Sabor receitas oficiais"
        }
        )();
    }, []);

    useEffect(() => {
        //THIS CODE IS SHOW SECTION IF USER SCROLLING PAGE
        const handleScroll = () => {
            if (window.scrollY > 20) setContentSection(true)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    //filter the recipes case user search some recipes
    useEffect(() => {
        const findRecipes = valueSearch ? smartSearch(recipes, valueSearch) : recipes

        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [recipes, postPerPage, valueSearch]);


    const topRankingByEyes = useCallback(() => {
        const recipesFiltered = recipes.filter(recipe => recipe.name_recipe && recipe)
        return [...recipesFiltered].sort((x, y) => y.nmr_eyes - x.nmr_eyes)
    }, [recipes]);

    const topRankingByHearts = useCallback(() => {
        const recipesFiltered = recipes.filter(recipe => recipe.name_recipe && recipe)
        return [...recipesFiltered].sort((x, y) => y.nmr_hearts.length - x.nmr_hearts.length)
    }, [recipes]);

    return (
        <main className="w-full max-w-[1500px] mt-4 mx-auto relative">
            <Suspense fallback={<Loading />}>
                <MostViewedRecipesContainer valueSearch={valueSearch} topRanking={topRankingByEyes} />
            </Suspense>

            {
                !valueSearch &&
                <Suspense fallback={<Loading />}>
                    <Adsense
                        slot="2090078650"
                        format="auto"
                        data-full-width-responsive="true"
                    />
                </Suspense>
            }

            <section className="grid grid-cols-2 md:grid-cols-4 gap-[2%] mt-4 min-h-screen relative">
                {
                    showContentSection &&
                    <>
                        <Suspense fallback={<Loading />}>
                            <ColumnLeftMainHome recipes={recipes} />
                        </Suspense>

                        <div className={`feed col-span-2 relative`}>
                            {!valueSearch &&
                                <Suspense fallback={<Loading />}>
                                    <PollRecipes />
                                    <CreateFeed user={user} />
                                </Suspense>
                            }
                            <Suspense fallback={<Loading />}>
                                <Feed
                                    contents={feed}
                                    setFeed={setFeed}
                                    valueSearch={valueSearch}
                                />
                            </Suspense>
                            {postPerPage <= feed.length &&
                                <Button
                                    customClass={"btn-primary flex items-center mt-16 mx-auto block px-8 text-s1_1"}
                                    event={() => setPostPerPage((nmr_post) => nmr_post + 10)}
                                >
                                    Ver mais receitas
                                    <MdArrowDropDown className="text-s2" />
                                </Button>
                            }
                        </div>
                        {
                            window.innerWidth > 700 &&
                            <Suspense fallback={<Loading />}>
                                <ColumnRightMainHome
                                    ranking={topRankingByHearts()}
                                />
                            </Suspense>
                        }
                    </>

                }
            </section>

            {/* This menu will only be displayed when the user is on the smartphone */}
            {window.innerWidth < 764 &&
                <MenuMobile
                    user={user}
                    ranking={topRankingByHearts()}
                />
            }

        </main>
    )
}


