import 'moment/locale/pt-br';

import { useEffect, useState } from "react";

import { FeedRecipes } from '../../molecules/FeedRecipes';
import { FeedTip } from '../../molecules/FeedTips';
import { Loading } from '../../atoms/Loading/Loading';

export const Feed = ({ contents, valueSearch }) => {
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
    }, [contents, listRecipeForRemove])

    const handleIdForAddListRemove = ({ currentTarget }) => {
        setListRecipeForRemove(list => [...list, currentTarget.id])
    };

    return (
        <div className='relative'>
            {feed.length ? feed.map((content) => {
                return (
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