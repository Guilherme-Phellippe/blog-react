import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuMobileOption from "../../organisms/MenuMobileOption";
import ColumnRightMainHome from "../../organisms/ColumnRightMainHome";
import { ActiveInformation } from "../../organisms/ActiveInformation";
import { dialog } from "../../../modals/Dialog";
import MenuMobileDisplay from "../../molecules/MenuMobileDisplay";
import { useCategoryApi, useRecipeApi } from "../../../hooks/useApi";

export default function MenuMobile({ ranking, setValueSearch, user }) {
    // USESTATE 
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [listCategoriesAndRecipes, setListCategoriesAndRecipes] = useState({ categories: [], recipes: ranking || [] })
    // USEREF
    const refCategoryApi = useRef(useCategoryApi());
    const refRecipesApi = useRef(useRecipeApi())
    const refRanking = useRef(null)
    const refValueRanking = useRef(ranking || null)
    const refNotification = useRef(null)
    //USENAVIGATE
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            //Api search all categories
            const categories = await refCategoryApi.current.getAllCategory();
            //In this line we check if there a value in the ranking, if we dont have that value, 
            //we look for all the recipes in the api
            const recipes = refValueRanking.current ?
                { data: refValueRanking.current }
                :
                await refRecipesApi.current.getAllRecipes()
            //in this line, we dont want to cause 2 renderings in component, with that we create a 
            //object and define two key: categories and recipes and we save the data in it
            setListCategoriesAndRecipes({ categories: categories.data, recipes: recipes.data })
        })()
    }, [])

    /**
     * This function return a recipe list.
     * if the ranking is null, we create a new list recipe with a best recipes
     * @returns list recipes order by best recipes
     */
    const rankingRecipes = () => {
        if (ranking) return ranking

        const recipesFiltered = listCategoriesAndRecipes.recipes.filter(recipe => recipe.name_recipe && recipe)
        return [...recipesFiltered].sort((x, y) => y.nmr_hearts.length - x.nmr_hearts.length)
    }


    const handleClickButtonMenu = async (currentTarget) => {
        document.documentElement.style.overflow = 'auto'
        setValueSearch(null)
        const nameMenu = currentTarget.querySelector("span").textContent;

        switch (nameMenu) {
            case "Home": {
                setMenuIsOpen(false)
                refRanking.current.classList.add('invisible')
                refNotification.current.classList.add('invisible')
                window.scrollTo({ top: 0, behavior: "smooth" })
                navigate('/')
                break;
            }
            case "Ranking": {
                refNotification.current.classList.add('invisible')
                setMenuIsOpen(false)
                let classListRanking = refRanking.current.classList
                let rankingIsOpen = [...classListRanking].includes("invisible")
                document.documentElement.style.overflow = rankingIsOpen ? 'hidden' : "auto"
                classListRanking.toggle('invisible')
                break;
            }
            case "Create": {
                navigate('/create')
                break;
            }
            case "Notificações": {
                setMenuIsOpen(false)
                refRanking.current.classList.add('invisible')
                if (user) {
                    let classListNotification = refNotification.current.classList
                    let notificationIsOpen = [...classListNotification].includes("invisible")
                    document.documentElement.style.overflow = notificationIsOpen ? 'hidden' : "auto"
                    classListNotification.toggle('invisible')
                } else {
                    const response = await dialog("Você precisa criar uma conta para receber notificações", 1, "Criar conta");
                    response && navigate('/register')
                }
                break;
            }
            case "Menu": {
                refRanking.current.classList.add('invisible')
                refNotification.current.classList.add('invisible')
                setMenuIsOpen(v => !v)
                break;
            }
            default:
        }

    }


    return (
        <>
            {/* show menu option fixed bottom  */}
            <MenuMobileOption
                handleClickButtonMenu={handleClickButtonMenu}
                menuIsOpen={menuIsOpen}
            />
            {/* when ranking is open show this content  */}
            <div
                ref={refRanking}
                className="flex flex-col w-4/5 h-screen z-[998] fixed top-0 right-0 bg-white invisible overflow-auto"
            >
                <ColumnRightMainHome ranking={rankingRecipes()} />
            </div>
            {/* when notification is open show this content  */}
            <div
                ref={refNotification}
                className="flex flex-col w-4/5 h-screen z-[998] fixed top-0 right-0 bg-white invisible overflow-auto"
            >
                <ActiveInformation user={user} infoSelect={"Notificações"} />
            </div>

            {menuIsOpen &&
                <MenuMobileDisplay
                    setMenuIsOpen={setMenuIsOpen}
                    setValueSearch={setValueSearch}
                    categories={listCategoriesAndRecipes.categories}
                />
            }
        </>

    )
}