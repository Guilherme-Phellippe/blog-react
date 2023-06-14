import { useCallback, useContext, useEffect, useState, useRef, lazy, Suspense } from "react";

import { HomeContext } from '../../../contexts/Home/HomeProvider'

import { GiPodium } from 'react-icons/gi'
import { MdArrowDropDown } from 'react-icons/md'

import { Button } from "../../atoms/Button";
import { useFeedApi } from "../../../hooks/useApi";

import { smartSearch } from "../../../scripts/smartSearch";
import { Loading } from "../../atoms/Loading/Loading";

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
    const [isOpenRanking, setIsOpenRanking] = useState(false)
    const [showIconRanking, setShowIconRanking] = useState(false)
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

        //THIS CODE IS FOR CLOSE MODAL RANKING
        const removeModalRankignRecipe = document.addEventListener('click', ({ target }) => {
            const box = target.closest("div[data-id=modal-ranking-recipe-mobile]")
            const seeMoreNewRecipe = target.dataset.id === "see-more"
            if (!box && !seeMoreNewRecipe) {
                setIsOpenRanking(false)
            }
        });

        return () => {
            document.removeEventListener('click', removeModalRankignRecipe)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    //filter the recipes case user search some recipes
    useEffect(() => {
        const findRecipes = valueSearch ? smartSearch(recipes, valueSearch) : recipes

        const newFeed = findRecipes.slice(0, postPerPage);

        setFeed(newFeed);
    }, [recipes, postPerPage, valueSearch]);

    useEffect(() => {
        if (isOpenRanking) document.documentElement.style.overflow = 'hidden'
        else document.documentElement.style.overflow = 'auto'
    }, [isOpenRanking])

    document.onscroll = () => {
        if (window.scrollY > 480) setShowIconRanking(true)
        else setShowIconRanking(false)
    }

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
            <Suspense fallback={<Loading />}>
                <Adsense
                    slot="2090078650"
                    format="auto"
                    data-full-width-responsive="true"
                />
            </Suspense>
            {console.log("showContentSection: "+ showContentSection)}

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
                                    setIsOpenRanking={setIsOpenRanking}
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

                        <Suspense fallback={<Loading />}>
                            <ColumnRightMainHome
                                ranking={topRankingByHearts()}
                            />
                        </Suspense>


                        {
                            window.innerWidth <= 767 && showIconRanking &&
                            <>
                                <div
                                    data-id="modal-ranking-recipe-mobile"
                                    className={`${!isOpenRanking ? "invisible translate-x-full" : 'visible translate-x-[43%]'} z-[999] transition-transform duration-400 fixed top-0 w-[70%] h-screen overflow-auto border-l-[2px] border-l-color_orange`}>
                                    <Suspense fallback={<Loading />} >
                                        <ColumnRightMainHome
                                            ranking={topRankingByHearts()}
                                            isOpenRanking={isOpenRanking}
                                        />
                                    </Suspense>
                                </div>
                                <div
                                    data-id="modal-ranking-recipe-mobile"
                                    onClick={() => setIsOpenRanking((open) => !open)}
                                    className={`${!isOpenRanking ? "right-[0px]" : 'right-[69%]'} shadow-md shadow-[#24242480] transition-all duration-450 z-50 fixed  bottom-32 w-[70px] border-[1px] border-white bg-color_orange rounded-tl-2xl rounded-bl-2xl flex justify-center`}>
                                    <GiPodium
                                        className="text-s4 fill-white mb-4" />
                                </div>
                            </>

                        }
                    </>

                }
            </section>

        </main>
    )
}


