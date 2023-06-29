import 'moment/locale/pt-br';

import { useEffect, useState } from "react";

import { FeedRecipes } from '../../molecules/FeedRecipes';
import { FeedTip } from '../../molecules/FeedTips';
import { Loading } from '../../atoms/Loading/Loading';

function AdsInFeed({ index }) {
    console.log(index)

    const viewer = () =>{
        switch (index) {
            case 7:
                return <h2>2</h2>
            case 11:
                return <h2>3</h2>
            case 15:
                return <h2>4</h2>
            case 19:
                return <h2>5</h2>
            default:
                return <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-format="fluid"
                    data-ad-layout-key="+3v+pt+4r-a-41"
                    data-ad-client="ca-pub-4781060024956035"
                    data-ad-slot="1096599178"
                ></ins>
        }
    }


    return viewer

}


export default function Feed({ contents, valueSearch }) {
    const listRecipeLocalStorage = localStorage.getItem("listIdForRemove") ? JSON.parse(localStorage.getItem("listIdForRemove")) : []
    const [listRecipeForRemove, setListRecipeForRemove] = useState(listRecipeLocalStorage);
    const hasSearch = valueSearch ? true : false;
    const [feed, setFeed] = useState(contents);

    useEffect(() => {
        //if listRecipeForRemove has a length bigger than seven, so the first item in this array will be removed,
        // this was done to that user does not delete all recipes
        listRecipeForRemove.length >= 7 && listRecipeForRemove.shift();
        //save the recipe's id in the localstorage
        localStorage.setItem("listIdForRemove", JSON.stringify(listRecipeForRemove));
        //call the function 'setFeed' and define new feed, removing the feed that was removed before
        const filteredFeed = contents.filter(content => !listRecipeForRemove.includes(content.id.toString()))

        setFeed(filteredFeed)
    }, [contents, listRecipeForRemove]);


    useEffect(() => {
        // GOOGLE ADSENSE 
        window.location.hostname !== 'localhost' &&
            (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, [])

    const handleIdForAddListRemove = ({ currentTarget }) => {
        setListRecipeForRemove(list => [...list, currentTarget.id])
    };

    return (
        <div className='min-h-screen relative'>
            {feed.length ? feed.map((content, index) => {
                return (
                    ((index + 1) % 4) === 0 ?
                        <div className="grid bg-white my-4">
                            <AdsInFeed index={index}/>
                        </div>
                        :
                        content.name_recipe ?
                            <FeedRecipes
                                key={content.id}
                                content={content}
                                hasSearch={hasSearch}
                                handleIdForAddListRemove={handleIdForAddListRemove}
                            />
                            :
                            <FeedTip
                                key={content.id}
                                content={content}
                                handleIdForAddListRemove={handleIdForAddListRemove}
                            />
                )
            }) : <Loading />}
        </div>
    )
}


