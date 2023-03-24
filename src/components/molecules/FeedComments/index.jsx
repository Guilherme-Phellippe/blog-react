import { RiSendPlaneFill } from "react-icons/ri"
import { Input } from "../../atoms/Input"
import { Img } from "../../atoms/Img"
import { MdDeleteForever } from 'react-icons/md'
import { useEffect, useRef, useState } from "react"
import { useCommentApi } from "../../../hooks/useApi"
import moment from "moment"

export const FeedComments = ({ comment, userLogged, setComments }) => {
    const [showbuttonAsnwer, setShowButtonAnswer] = useState(true)
    const [showIconDelete, setShowIconDelete] = useState(false)
    const [allAnswer, setAllAnswer] = useState([])
    const refCommentApi = useRef(useCommentApi());
    const refInputAnswer = useRef();


    useEffect(() =>{

        (async ()=>{
            const filteredAnswer = []
            for(let answer of comment.answer){  
                if(answer.userId && answer.createdAt) filteredAnswer.push(answer)
                else {
                    const ids = {
                        commentId: comment.id,
                        userId: ,
                        answerId: answer.id,
                    }
                    const response = await refCommentApi.current.deleteAnswer(ids);
                    if(response.status === 200) console.error("answer was removed by miss data")
                }
    
            }
            setAllAnswer(filteredAnswer)
        })()
    }, [comment, userLogged])


    const handleShowIconDelete = (e) => {
        if (e.type === "mouseenter" || e.type === 'click') {
            if (userLogged) {
                const { id } = e.currentTarget.dataset

                console.log(allAnswer)

                if (id === userLogged.id || !!allAnswer.find(answer => answer.userId === Number(id))) setShowIconDelete(true)


            }
        } else setShowIconDelete(false)
    }

    const handleDeleteComment = async ({ currentTarget }) => {
        //eslint-disable-next-line
        const canDelete = confirm("Deseja realmente remover esse comentário?");

        if (canDelete) {
            if (userLogged) {
                const commentId = currentTarget.id
                const userId = userLogged.id;
                const data = await refCommentApi.current.deleteComment({ commentId, userId });
                if (data.status === 201) {
                    const nmrComments = currentTarget.closest("#feed-recipe").querySelector("[data-id=total_nmr_comments] > span")
                    nmrComments.textContent = Number(nmrComments.textContent) !== 0 ? Number(nmrComments.textContent - 1) : 0
                    setComments(comments => comments.filter(comment => comment.id !== commentId));
                    alert("Comentário removido com sucesso")
                } else {

                }
            } else alert("Você precisa estar logado para poder excluir esse commentário")
        }

    }

    const handleDeleteAnswer = async (answer) => {
        //eslint-disable-next-line
        const confirmData = confirm("Deseja realmente excluir essa resposta?");

        if (confirmData) {
            const ids = {
                commentId: comment.id,
                userId: userLogged.id,
                answerId: answer.id,
            }

            const response = await refCommentApi.current.deleteAnswer(ids)
            console.log(response)
            if (response.status === 200) {
                setComments(coments => [...coments]);
                alert("Comentário removido com sucesso")
            }

        }
    }

    const handleCreateAnswerComment = async ({ currentTarget }) => {
        const commentId = currentTarget.id

        if (commentId) {


            if (userLogged) {
                const answer = refInputAnswer.current.value
                if (!!answer) {
                    const answerData = {
                        commentId,
                        userId: userLogged.id,
                        answer
                    }

                    const response = await refCommentApi.current.createNewAnswer(answerData);
                    if (response.status === 201) {
                        refInputAnswer.current.value = ''
                        setShowButtonAnswer(true)
                        setAllAnswer(v => [...v, response.data]);
                    }
                } else alert("Escreva sua resposta!")
            }
        } else alert("Esse comentário não existe mais, reinicie a página para ver os resultados!")



    }

    const handleKeyEnterForCreateAnswer = ({ code, target }) => {
        const obj = {
            currentTarget: target.closest('div').querySelector("svg")
        };

        if (code === "Enter") handleCreateAnswerComment(obj)
    }

    return (
        <div id="container-comment" className="w-full my-6 flex flex-col items-center">
            <div
                data-id={comment.user.id}
                onMouseEnter={handleShowIconDelete}
                onClick={handleShowIconDelete}
                onMouseLeave={handleShowIconDelete}
                className="w-full h-1/2 flex items-center px-4 group">
                <div className="w-[40px] h-full">
                    <Img
                        className="w-full h-full rounded-full object-cover"
                        src={comment.user.photo}
                        alt={comment.user.name}
                    />
                </div>
                <div className="rounded-3xl m-2 flex flex-col justify-start items-start bg-background">
                    <div className="flex items-center mt-4 mx-4 gap-2">
                        <h2 className="font-bold text-s1_1">{comment.user.name} - </h2>
                        <span className="text-s1">{moment(comment.createdAt).startOf('minutes').fromNow()}</span>
                    </div>
                    <p className="text-s1_1 my-4 mx-6">{comment.comment}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    {
                        showIconDelete
                        &&
                        <MdDeleteForever
                            id={comment.id}
                            title="Excluir seu comentário"
                            onClick={handleDeleteComment}
                            className="hidden text-s2 fill-red-700 cursor-pointer group-hover:block" />
                    }
                    <span
                        onClick={() => setShowButtonAnswer(btn => !btn)}
                        className="hover:underline w-auto cursor-pointer text-s1_1" >
                        Responder</span>

                </div>
            </div>
            {!!allAnswer.length &&
                allAnswer.map((answer, index) => {
                    return <div
                        data-id={answer.userId}
                        onMouseEnter={handleShowIconDelete}
                        onClick={handleShowIconDelete}
                        onMouseLeave={handleShowIconDelete}
                        key={index}
                        className="w-full h-1/2 flex items-center group">
                        <div className="ml-[60px] h-[80%] overflow-hidden rounded-full">
                            <img className="w-[40px] h-[40px] object-cover" src={answer.photo} alt={answer.name} />
                        </div>
                        <div className="px-4 py-2 rounded-3xl m-2 flex flex-col bg-background">
                            <div className="flex items-center mt-4 mx-4 gap-2">
                                <h2 className="font-bold text-s1_1 ">{answer.name} - </h2>
                                <span className="text-s1">{moment(answer.createdAt).startOf('minutes').fromNow()}</span>
                            </div>
                            <p className="text-s1_1 ml-4 mt-2">{answer.answer}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            {
                                showIconDelete
                                &&
                                <MdDeleteForever
                                    id={comment.id}
                                    title="Excluir seu comentário"
                                    onClick={() => handleDeleteAnswer(answer)}
                                    className="hidden text-s2 fill-red-700 cursor-pointer group-hover:block" />
                            }
                        </div>
                    </div>
                })
            }
            {
                !showbuttonAsnwer ?
                    <div
                        className="w-full h-1/2 mt-3 flex items-center gap-2 bg-white">
                        <div className="ml-[60px] w-[40px] h-[40px] overflow-hidden rounded-full">
                            <Img
                                className="w-full h-full rounded-full object-cover"
                                src={userLogged ? userLogged.photo : "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                                alt={comment.user.name}
                            />
                        </div>
                        <Input
                            ref={refInputAnswer}
                            placeholder={`Responda o comentário de ${comment.user.name}...`}
                            onKeyDown={handleKeyEnterForCreateAnswer}
                            icon={<RiSendPlaneFill id={comment.id} onClick={handleCreateAnswerComment} className="text-s1_5 cursor-pointer fill-blue-500" />}
                        />
                    </div> : null
            }
        </div>)
}