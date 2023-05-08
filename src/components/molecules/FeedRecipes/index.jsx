import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { CarouselMidiasContent } from "../../molecules/CarouselMidiasContent";
import { AddRecipeInfo } from "../../molecules/AddRecipeInfo";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import { useState } from "react";

export const FeedRecipes = ({ content , hasSearch, handleIdForAddListRemove, setIsOpenRanking}) => {
    const [xStart, setXStart]= useState(null)

    const handleTouchStart = ({ nativeEvent }) =>{
        setXStart(nativeEvent.changedTouches[0].clientX)
    }

    const handleTouchEnd = ({ nativeEvent }) =>{

        if(xStart){
            let xEnd = nativeEvent.changedTouches[0].clientX

            let difference = xStart - xEnd

            if(difference > 50) setIsOpenRanking(true)
            else setIsOpenRanking(false)

            xEnd = null
            setXStart(null)
        }
    }


    return (
        <div 
            data-id="feed-recipe"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={`flex w-full bg-white mt-6 ${hasSearch ? 'items-center h-[20rem]' : 'flex-col h-[60rem]'}`}>
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