import { lazy, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loading } from '../../atoms/Loading/Loading';
import { useFeedApi, useTipApi } from '../../../hooks/useApi';
import { InfoTipContent } from '../../organisms/InfoTipContent';

const RecipeSimilarContent = lazy(() => import("../../organisms/RecipeSimilarContent"))
const IconsShare = lazy(() => import('../../organisms/IconsShare'))


export const TipMain = () => {
    const { id } = useParams();
    const [tip, setTip] = useState(null)
    const refTipApi = useRef(useTipApi());
    const refFeedApi = useRef(useFeedApi());

    useEffect(() => {
        (async () => {
            refFeedApi.current.updateNumberEyes(id)
            const { data } = await refTipApi.current.getUniqueTip(id)
            setTip(data)
            document.title = data.name_tip + " - Tem sabor Receitas oficiais"
        })();
    }, [id]);


    return (
        <div className="w-full max-w-[1500px] mx-auto">
            <main className='flex flex-col w-[95%] md:w-5/6 mt-8 mx-auto'>
                {tip ?  <IconsShare recipe={tip} /> : <Loading />}
                <div className="w-full bg-white min-h-screen">
                    {tip ? <InfoTipContent tip={tip} /> : <Loading />}
                    {tip ? <RecipeSimilarContent name_search={tip.name_tip} /> : <Loading />}
                </div>
            </main>
        </div>
    )
}