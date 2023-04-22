import { RiAccountBoxFill, RiDeleteBinFill, RiSendPlaneFill } from "react-icons/ri"
import { Input } from "../../atoms/Input"
import { Img } from "../../atoms/Img"
import { MdDeleteForever } from 'react-icons/md'
import { useRef, useState } from "react"
import { useCommentApi } from "../../../hooks/useApi"
import moment from "moment"
import { DialogConfirm } from "../../../modals/DialogConfirm"
import { useNavigate } from "react-router-dom"
import { DialogAlert } from "../../../modals/DialogAlert"

export const FeedComments = ({ comment, userLogged, setComments }) => {
    const [showbuttonAsnwer, setShowButtonAnswer] = useState(true)
    const [showIconDelete, setShowIconDelete] = useState(false)
    const [allAnswer, setAllAnswer] = useState(comment.answer);
    const [openModalDialog, setModalDialog] = useState(false);
    const [containerConfirm, setContainerConfirm] = useState()
    const [openModalAlert, setModalAlert] = useState(false);
    const [containerAlert, setContainerAlert] = useState()
    const navigate = useNavigate()
    const refCommentApi = useRef(useCommentApi());
    const refInputAnswer = useRef();

    const handleShowIconDelete = (e) => {
        if (e.type === "mouseenter" || e.type === 'click') {
            if (userLogged) {
                const { id } = e.currentTarget.dataset
                if (userLogged.admin || id === userLogged.id || !!allAnswer.find(answer => answer.userId === Number(id))) setShowIconDelete(true)
            }
        } else setShowIconDelete(false);
    }

    const handleDeleteComment = async ({ currentTarget }) => {
        async function deleteComment() {
            if (userLogged) {
                const commentId = currentTarget.id
                const userId = userLogged.id;
                const data = await refCommentApi.current.deleteComment({ commentId, userId });
                if (data.status === 201) {
                    setContainerAlert({
                        function: setModalAlert(true),
                        type: 2,
                        message: "Comentário excluido com sucesso",
                        eventClose: () => setComments(comments => comments.filter(comment => comment.id !== commentId)),
                    });

                    const nmrComments = currentTarget.closest("#feed-recipe")?.querySelector("[data-id=total_nmr_comments] > span")
                    if (nmrComments) nmrComments.textContent = Number(nmrComments.textContent) !== 0 ? Number(nmrComments.textContent - 1) : 0
                } else {
                    setContainerConfirm({
                        function: setModalAlert(true),
                        type: 0,
                        message: "Não foi possivel excluir seu comentário, deseja enviar informações ao suporte?",
                        button: {
                            title: "Enviar informações",
                            event: () => console.error("erro ao enviar informações")
                        },
                    })
                }
            } else setContainerConfirm({
                function: setModalDialog(true),
                type: 1,
                message: "Crie uma conta ou entre em uma conta existente para poder excluir esse comentário",
                button: {
                    icon: <RiAccountBoxFill />,
                    title: "Criar conta",
                    event: navigate('/')
                }
            });
        }

        setContainerConfirm({
            function: setModalDialog(true),
            type: 0,
            message: "Deseja realmente excluir esse comentário?",
            button: {
                icon: <RiDeleteBinFill />,
                title: "Excluir",
                event: () => deleteComment(),
            }
        })

    }

    const handleDeleteAnswer = async (answer) => {
        async function deleteAnswer() {
            const ids = {
                commentId: comment.id,
                userId: answer.userId || userLogged.id,
                answerId: answer.id,
            }

            const response = await refCommentApi.current.deleteAnswer(ids)
            if (response.status === 201) {
                
                setContainerAlert({
                    function: setModalAlert(true),
                    type: 2,
                    message: "Resposta ao comentário removido com sucesso!",
                    eventClose: () => setAllAnswer(ans => ans.filter(a => a.id !== answer.id)),
                })
            }
        }


        setContainerConfirm({
            function: setModalDialog(true),
            type: 0,
            message: "Deseja realmente excluir esse comentário?",
            button: {
                title: "Excluir",
                event: () => deleteAnswer()
            }
        })
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
                } else containerConfirm({
                    function: setModalDialog(true),
                    type: 1,
                    message: "Escreva sua resposta!"
                })
            } else setContainerConfirm({
                function: setModalDialog(true),
                type: 1,
                message: "Crie uma conta para poder responder esse comentário!",
                button: {
                    icon: <RiAccountBoxFill />,
                    text: "Criar conta",
                    event: () => navigate('/register')
                }
            })
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
                className="w-full h-1/2 flex items-center px-4 group">
                <div>
                    <Img
                        className="min-w-[40px] w-[40px] h-[40px] rounded-full object-cover"
                        src={comment.user.photo}
                        alt={comment.user.name}
                    />
                </div>
                <div className="w-auto rounded-3xl m-2 flex flex-col justify-start items-start bg-background">
                    <div className="flex items-center mt-2 mx-4 gap-2">
                        <h2 className="font-bold text-s1_3">{comment.user.name} - </h2>
                        <span className="text-s1">{moment(comment.createdAt).startOf('seconds').fromNow()}</span>
                    </div>
                    <p className="text-s1_3 mx-6 mb-3">{comment.comment}</p>
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
                        onClick={() => userLogged.id ? setShowButtonAnswer(btn => !btn) : setContainerConfirm({
                            function: setModalDialog(true),
                            type: 1,
                            message: "Crie uma conta para responder esse comentário!",
                            button: {
                                icon: <RiAccountBoxFill />,
                                title: "Criar conta",
                                event: () => navigate('/register')
                            }
                        })}
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
                                className="w-full h-full rounded-full object-cover"
                                src={userLogged.photo || "https://i.ibb.co/JCNSM0R/143086968-2856368904622192-1959732218791162458-n.png"}
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

            {/* MODAL: */}
            {
                openModalDialog && <DialogConfirm
                    open={{ openModalDialog, setModalDialog }}
                    container={containerConfirm}
                />
            }
            {
                openModalAlert && <DialogAlert
                    open={{ openModalAlert, setModalAlert }}
                    container={containerAlert}
                />
            }

        </div>)
}