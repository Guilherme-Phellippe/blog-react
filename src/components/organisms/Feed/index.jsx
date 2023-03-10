import 'moment/locale/pt-br';

import { useEffect} from "react";

import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { CarouselMidiasContent } from "../../molecules/CarouselMidiasContent";
import { AddRecipeInfo } from "../../molecules/AddRecipeInfo";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import { BoxAddNewComment } from '../../molecules/BoxAddNewComment';

export const Feed = ({ contents, setFeed, setListRecipeForRemove, listRecipeForRemove, valueSearch }) => {
    const hasSearch = valueSearch ? true : false;

    useEffect(() => {
        //if listRecipeForRemove has a length bigger than seven, so the first item in this array will be removed,
        // this was done to that user does not delete all recipes
        listRecipeForRemove.length >= 7 && listRecipeForRemove.shift();
        //save the recipe's id in the localstorage
        localStorage.setItem("listIdForRemove", JSON.stringify(listRecipeForRemove))
        //call the function 'setFeed' and define new feed, removing the feed that was removed before
        setFeed(contents => contents.filter(content => !listRecipeForRemove.includes(content.id.toString())))
    }, [listRecipeForRemove, setFeed])

    const handleIdForAddListRemove = ({ currentTarget }) => {
        setListRecipeForRemove(list => [...list, currentTarget.id])
    };

    return (
        <div>
            {contents.length ? contents.map((content) => {
                return (
                    <div key={content.id} id="feed-recipe">
                        <div className={`flex w-full bg-white mt-6 ${hasSearch ?'items-center h-[20rem]':'flex-col h-[60rem]'}`}>
                            <HeaderInfoFeed content={content} onClick={handleIdForAddListRemove}/>

                            <CarouselMidiasContent
                                img={content.images_recipe}
                                name_recipe={content.name_recipe}
                                category={content.category.name_category}
                            />

                            <AddRecipeInfo 
                                hasSearch={hasSearch}
                                content={content}
                            />

                            <BlockInteractionFeed 
                                nmr_hearts={content.nmr_hearts}
                                comments={content.comments}
                            />
                            
                        </div>

                        <div id="feed-comment" className="w-full flex-col items-center justify-center bg-white border-t-[1px] border-solid py-4 hidden">
                            
                            <ListRecipeComments content={content}/>

                            <BoxAddNewComment author={content.author} />
                            
                        </div>
                    </div>
                )
            }) : <h2 className="text-s1_5 p-4 text-center">N??o encontramos sua receita =(</h2>}


        </div>
    )
}