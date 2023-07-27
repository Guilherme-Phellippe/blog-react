
import { RiSendPlaneFill } from "react-icons/ri"
import { AiOutlineComment } from "react-icons/ai"

import { Input } from "../../atoms/Input"
import { Img } from "../../atoms/Img"
import { MdDeleteForever } from 'react-icons/md'
import {  useRef, useState } from "react"
import { useCommentApi } from "../../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { dialog } from "../../../modals/Dialog"

import moment from "moment"

export const FeedComments = ({ comment, userLogged, setComments }) => {
    const [showbuttonAsnwer, setShowButtonAnswer] = useState(true)
    const [showIconDelete, setShowIconDelete] = useState(false)
    const [allAnswer, setAllAnswer] = useState(comment.answer);
    const navigate = useNavigate()
    const refCommentApi = useRef(useCommentApi());
    const refInputAnswer = useRef();

    /**
     *  função criada para mostrar o icon delete apenas para o proprietário do comentário
     * @param {*} e 
     */
    const handleShowIconDelete = (e) => {
        if (e.type === "mouseenter" || e.type === 'click') {
            if (userLogged) {
                const { id } = e.currentTarget.dataset
                if (userLogged.admin || id === userLogged.id || !!allAnswer.find(answer => answer.userId === Number(id))) setShowIconDelete(true)
            }
        } else setShowIconDelete(false);
    }

    const handleDeleteComment = async ({ currentTarget }) => {
        const response = await dialog("Deseja realmente excluir esse comentário?", 0, "Excluir")
        if (response) {
            if (userLogged) {
                const commentId = currentTarget.id
                const userId = userLogged.id;
                const data = await refCommentApi.current.deleteComment({ commentId, userId });
                if (data.status === 201) {
                    await dialog("Comentário excluido com sucesso", 2)
                    setComments(comments => comments.filter(comment => comment.id !== commentId))
                    const nmrComments = currentTarget.closest("#feed-recipe")?.querySelector("[data-id=total_nmr_comments] > span")
                    if (nmrComments) nmrComments.textContent = Number(nmrComments.textContent) !== 0 ? Number(nmrComments.textContent - 1) : 0
                } else await dialog("Não foi possivel excluir seu comentário, tente novamente mais tarde", 2)

            } else {
                const response = await dialog("Crie uma conta ou entre em uma conta existente para poder excluir esse comentário", 1, "Criar Conta")
                if (response) navigate('/register')
            }
        }
    }

    const handleDeleteAnswer = async (answer) => {
        const response = await dialog("Deseja realmente excluir esse comentário?", 0, "Excluir")
        if (response) {
            const ids = {
                commentId: comment.id,
                userId: answer.userId || userLogged.id,
                answerId: answer.id,
            }

            const response = await refCommentApi.current.deleteAnswer(ids)
            if (response.status === 201) {
                await dialog("Resposta ao comentário removido com sucesso!", 2)
                setAllAnswer(ans => ans.filter(a => a.id !== answer.id))
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
                } else await dialog("Escreva sua resposta", 1)
            } else {
                const response = await dialog("Crie uma conta para poder responder esse comentário!", 1, "Criar conta")
                if (response) navigate('/register')
            }

        }
    }

    const handleKeyEnterForCreateAnswer = ({ code, target }) => {
        const obj = {
            currentTarget: target.closest('div').querySelector("svg")
        };

        if (code === "Enter") handleCreateAnswerComment(obj)
    }

    return (
        <div id="container-comment" className="w-full flex flex-col items-center">
            <div
                data-id={comment.user.id}
                onMouseEnter={handleShowIconDelete}
                onClick={handleShowIconDelete}
                onMouseLeave={handleShowIconDelete}
                className="w-full h-1/2 flex items-center px-4 group my-1"
            >
                <div className="min-w-[40px] w-[40px] h-[40px] rounded-full object-cover overflow-hidden">
                    <Img
                        imgs={comment.user.photo}
                        alt={comment.user.name}
                    />
                </div>
                <div className="w-auto rounded-3xl m-2 flex flex-col justify-start items-start bg-background">
                    <div className="flex items-center my-2 mx-4 gap-2">
                        <h2 className="font-bold text-s1_3">{comment.user.name} - </h2>
                        <span className="text-s1">{moment(comment.createdAt).startOf('seconds').fromNow()}</span>
                    </div>
                    <p className="text-s1_3 mx-6 mb-3">{comment.comment}</p>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <span
                        onClick={() => userLogged.id ?
                            setShowButtonAnswer(btn => !btn) :
                            (async () => {
                                const response = await dialog("Crie uma conta para responder esse comentário!", 1, "Criar conta")
                                response && navigate('/')
                            })()
                        }
                        className="text-s2 text-blue-400 cursor-pointer group-hover:block"
                    >
                        <AiOutlineComment />
                    </span>
                    {
                        showIconDelete
                        &&
                        <MdDeleteForever
                            id={comment.id}
                            title="Excluir seu comentário"
                            onClick={handleDeleteComment}
                            className="hidden text-s2 fill-red-700 cursor-pointer group-hover:block"
                        />
                    }

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
                        className="w-full h-1/2 flex items-center group"
                    >
                        <div className="ml-[60px] w-[35px] h-[35px] overflow-hidden rounded-full">
                            <Img imgs={answer.photo} alt={answer.name} />
                        </div>
                        <div className="rounded-3xl m-2 flex flex-col bg-background">
                            <div className="flex items-center mx-3 mt-2 gap-2">
                                <h2 className="font-bold text-s1_2">{answer.name} - </h2>
                                <span className="text-s1">{moment(answer.createdAt).startOf('seconds').fromNow()}</span>
                            </div>
                            <p className="text-s1_2 mx-6 my-2">{answer.answer}</p>
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
                        className="w-full h-1/2 mt-3 mb-6 flex items-center gap-2 bg-white">
                        <div className="ml-[60px] w-[40px] h-[40px] overflow-hidden rounded-full">
                            <Img
                                imgs={userLogged.photo || "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
                                alt={userLogged.name || "Avatar do usuario sem foto Usuário"}
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