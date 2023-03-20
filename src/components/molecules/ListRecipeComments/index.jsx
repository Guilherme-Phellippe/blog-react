import { FeedComments } from "../FeedComments"

export const ListRecipeComments = ({ comments }) => {
    return (
        <div className="flex flex-col max-h-[18rem] overflow-y-auto overflow-x-hidden">
            {
                comments.length
                    ? comments.map(comment => {
                        return <FeedComments
                            key={comment.id}
                            comment={comment}
                        />
                    })
                    : <h2 className="text-s1_5 p-4 text-gray-500">Digite o primeiro comentário dessa receita...</h2>
            }
        </div>
    )
}