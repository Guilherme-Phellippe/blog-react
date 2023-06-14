import { lazy } from "react";

import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { AddRecipeInfo } from "../../molecules/AddRecipeInfo";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';

const CarouselMidiasContent = lazy(() => import("../../molecules/CarouselMidiasContent"))


export const FeedRecipes = ({ content, hasSearch, handleIdForAddListRemove }) => {

    return (
        <div
            data-id="feed-recipe"
        >
            <div className={`flex w-full bg-white mt-6 ${hasSearch ? 'items-center h-[20rem]' : 'flex-col h-auto'}`}>
                <HeaderInfoFeed content={content} onClick={handleIdForAddListRemove} />

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
                    content={content}
                />
            </div>

           { !hasSearch && <ListRecipeComments content={content} /> }
        </div>
    )
}