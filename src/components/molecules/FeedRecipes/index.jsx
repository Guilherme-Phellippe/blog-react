import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { CarouselMidiasContent } from "../../molecules/CarouselMidiasContent";
import { AddRecipeInfo } from "../../molecules/AddRecipeInfo";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';

export const FeedRecipes = ({ content , hasSearch, handleIdForAddListRemove}) => {


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

            <ListRecipeComments
                content={content} />
        </div>
    )
}