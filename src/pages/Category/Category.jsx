import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"

import { useCategoryApi } from "../../hooks/useApi"

import { ColumnAllCategories } from "../../components/templates/ColumnAllCategories"
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { ShowSelectedCategories } from "../../components/templates/ShowSelectedCategories"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const Category = () => {
    const { sub } = useParams();
    const [categorySelect, setCategorySelect] = useState(sub)
    const refCategoryApi = useRef(useCategoryApi())
    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async () => {
            const { data } = await refCategoryApi.current.getAllCategory();
            data.sort((a, b) => a.name_category.toLowerCase() < b.name_category.toLowerCase() ? -1 : a.name_category.toLowerCase() > b.name_category.toLowerCase() ? 1 : 0)
            data.sort((a, b) => b.recipe - a.recipe)
            const categories = data.filter(category => category.recipe >= 1)
            setCategories(categories)
        })()
    }, [])


    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <main className="flex flex-col md:flex-row w-[95%] md:w-11/12 bg-white mx-auto">
                    <ColumnAllCategories
                        categories={categories}
                        categorySelect={categorySelect}
                        setCategorySelect={setCategorySelect} />
                    <ShowSelectedCategories
                        categories={categories}
                        categorySelect={categorySelect} />
                </main>
                <Footer />
            </HomeProvider>
        </div>
    )
}
