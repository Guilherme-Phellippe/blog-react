import { useEffect, useRef, useState } from "react"
import { useUserApi } from "../../../hooks/useApi";
import { BoxAddNewComment } from "../BoxAddNewComment"
import { FeedComments } from "../FeedComments"

export const ListRecipeComments = ({ content }) => {
    const refToken = useRef(JSON.parse(localStorage.getItem('token')));
    const refUserApi = useRef(useUserApi());
    const [userLogged, setUserLogged] = useState([])
    const [comments, setComments] = useState(content.comments)

    useEffect(() => {
        if (refToken.current.id) {
            (async () => {
                const { data } = await refUserApi.current.authenticateLogin(refToken.current.id);
                setUserLogged(data)
            })();
        }
    }, []);

    return (
        <div id="feed-comment" className="w-full flex-col items-center justify-center bg-white border-t-[1px] border-solid py-4 hidden">

            <div
                onLoad={({ currentTarget }) => currentTarget.scrollBy(0, 100) }
                id="box-comment"
                className="w-full flex flex-col max-h-[25rem] overflow-y-auto overflow-x-hidden">
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
                idRecipe={content.id}
                setComments={setComments} />

        </div>


    )
}