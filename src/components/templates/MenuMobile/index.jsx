import { useContext, useEffect, useRef, useState } from "react";
import { HomeContext } from "../../../contexts/Home/HomeProvider";
import { useNavigate } from "react-router-dom";
import MenuMobileOption from "../../organisms/MenuMobileOption";
import ColumnRightMainHome from "../../organisms/ColumnRightMainHome";
import { ActiveInformation } from "../../organisms/ActiveInformation";
import { dialog } from "../../../modals/Dialog";
import MenuMobileDisplay from "../../molecules/MenuMobileDisplay";
import { useCategoryApi } from "../../../hooks/useApi";

export default function MenuMobile({ user, ranking }) {
    const { setValueSearch } = useContext(HomeContext);
    const refCategoryApi = useRef(useCategoryApi());
    const refRanking = useRef(null)
    const refNotification = useRef(null)
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            const response = await refCategoryApi.current.getAllCategory();
            setCategories(response.data)
        })()
    }, [])


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
                <ColumnRightMainHome ranking={ranking} />
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
                    categories={categories}
                />
            }
        </>

    )
}