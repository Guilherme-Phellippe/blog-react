import { HeaderInfoFeed } from "../../molecules/HeaderInfoFeed";
import { BlockInteractionFeed } from "../../molecules/BlockInteractionFeed";
import { ListRecipeComments } from '../../molecules/ListRecipeComments';
import { DescriptionTip } from "../DescriptionTip";

export const FeedTip = ({ content , handleIdForAddListRemove}) => {
    return (
        <div data-id="feed-recipe">
            <div className={`flex w-full bg-white mt-6 flex-col h-auto max-h-[60rem]`}>
                <HeaderInfoFeed content={content} onClick={handleIdForAddListRemove} />

                <DescriptionTip
                    content={content}
                />

                <BlockInteractionFeed
                    comments={content.comments}
                    idRecipe={content.id}
                />

            </div>

            <ListRecipeComments
                content={content} />
        </div>
    )
}