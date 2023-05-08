import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import { DescriptionTip } from "../DescriptionTip";
import { useState } from "react";

export const FeedTip = ({ content , handleIdForAddListRemove, setIsOpenRanking}) => {

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
            <div className={`flex w-full bg-white mt-6 flex-col h-auto max-h-[60rem]`}>
                <HeaderInfoFeed content={content} onClick={handleIdForAddListRemove} />

                <DescriptionTip
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