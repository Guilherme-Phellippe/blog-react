import { useContext, useState } from "react"
import { BoxAddNewComment } from "../BoxAddNewComment"
import { FeedComments } from "../FeedComments"
import { HomeContext } from "../../../contexts/Home/HomeProvider";

export const ListRecipeComments = ({ content }) => {
    const { user: userLogged } = useContext(HomeContext)
    const [comments, setComments] = useState(content.comments)


    return (
        <div data-id="feed-comment" className="w-full flex-col items-center justify-center bg-white border-t-[1px] border-solid py-4">

            <div
                onLoad={({ currentTarget }) => currentTarget.scrollBy(0, 100) }
                id="box-comment"
                className="w-full flex flex-col max-h-[25rem] overflow-y-auto overflow-x-hidden my-4">
                {
                    comments.length
                        ? comments.map(comment => {
                            return <FeedComments
                                key={comment.id}
                                comment={comment}
                                setComments={setComments}
                                userLogged={userLogged}
                            />
                        })
                        : <h2 id="no-comment" className="text-s1_5 p-4 text-color_text opacity-[.3] text-center">Digite o primeiro comentário dessa receita...</h2>
                }
            </div>

            <BoxAddNewComment
                userLogged={userLogged}
                id={content.id}
                setComments={setComments}
                isRecipe={content.name_recipe ? true : false}
            />

        </div>


    )
}