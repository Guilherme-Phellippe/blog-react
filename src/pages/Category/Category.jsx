import { useState } from "react"
import { useParams } from "react-router-dom"
import { ColumnAllCategories } from "../../components/templates/ColumnAllCategories"
import { Footer } from "../../components/templates/Footer/Footer"
import { Header } from "../../components/templates/Header/Header"
import { ShowSelectedCategories } from "../../components/templates/ShowSelectedCategories"
import { HomeProvider } from "../../contexts/Home/HomeProvider"

export const Category = () => {
    const { sub } = useParams();
    const [categorySelect, setCategorySelect ] = useState(sub)


    return (
        <div className="container">
            <HomeProvider>
                <Header />
                <main className="flex w-11/12 bg-white mx-auto">
                    <ColumnAllCategories categorySelect={categorySelect} setCategorySelect={setCategorySelect} />
                    <ShowSelectedCategories categorySelect={categorySelect}/>
                </main>
                <Footer />
            </HomeProvider>
        </div>
    )
}
