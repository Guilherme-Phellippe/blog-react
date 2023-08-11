import { Suspense, lazy, memo, useEffect, useRef, useState } from 'react';
import { useCategoryApi } from '../../../hooks/useApi';
import Bartop from '../../organisms/HeaderBartop';
import { Loading } from '../../atoms/Loading/Loading';

const Menu = lazy(() => import('../../organisms/HeaderMenu'))

function Header({ user }) {

    const [categories, setCategories] = useState()
    const refCategoryApi = useRef(useCategoryApi())
    const searchDataCategories = useRef(true)


    useEffect(() => {
        if (searchDataCategories.current) {
            searchDataCategories.current = false;
            (async () => {
                const { data } = await refCategoryApi.current.getAllCategory();
                data.sort((a, b) => b.recipe - a.recipe)
                const categories = data.filter(category => category.recipe >= 1)
                setCategories(categories)
            })()
        }
    }, [])


    return (
        categories &&
        <header className='w-full bg-color_orange flex flex-col items-center z-[999] mb-8 md:mb-16 relative'>

            <Bartop />

            <Suspense fallback={<Loading />}>
                <Menu
                    categories={categories}
                    user={user}
                />
            </Suspense>
        </header>

    )
}


export default memo(Header);


