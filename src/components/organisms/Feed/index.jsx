import moment from "moment"
import 'moment/locale/pt-br';

import { useEffect} from "react";
import { Link } from "react-router-dom"

import { RiCloseCircleFill, RiSendPlaneFill } from "react-icons/ri"

import { Button } from '../../atoms/Button'
import { Input } from "../../atoms/Input";
import { NumberLoved } from '../../atoms/NumberLoved'
import { LikeComentsSaveButtons } from "../../molecules/LikeComentSaveButtons"
import { FeedComments } from "../FeedComments";

import './feed.css'

export const Feed = ({ contents, setFeed, setListRecipeForRemove, listRecipeForRemove, hasSearch }) => {
    const classForSearch = hasSearch ? "style-search" : '';

    useEffect(() => {
        //if listRecipeForRemove has a length bigger than seven, so the first item in this array will be removed,
        // this was done to that user does not delete all recipes
        listRecipeForRemove.length >= 7 && listRecipeForRemove.shift();
        //save the recipe's id in the localstorage
        localStorage.setItem("listIdForRemove", JSON.stringify(listRecipeForRemove))
        //call the function 'setFeed' and define new feed, removing the feed that was removed before
        setFeed(contents => contents.filter(content => !listRecipeForRemove.includes(content.id.toString())))
    }, [listRecipeForRemove, setFeed])

    const handleIdForAddListRemove = ({ currentTarget }) => {
        setListRecipeForRemove(list => [...list, currentTarget.id])
    };



    return (
        <div  className="box-feed-recipe">
            {contents.length ? contents.map((content) => {
                return (
                    <div id="feed-recipe" className="">
                        <div key={content.id} className={`content-feed-user ${classForSearch}`}>
                            <div className="info-user h-[10%]">
                                <div className="box-photo">
                                    <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt={content.author} />
                                </div>
                                <div className="box-name-date">
                                    <h2 className="text-s1_2">{content.author}</h2>
                                    <p>{moment(content.createdAt).startOf('hour').fromNow()}</p>
                                </div>
                                <div className="box-utils">
                                    <RiCloseCircleFill
                                        id={content.id}
                                        onClick={handleIdForAddListRemove}
                                        className="close"
                                    />
                                </div>
                            </div>

                            <div id="title-recipe" className="flex gap-2 items-center px-4 h-[5%]">
                                <h2 className="text-s1_3">{content.name_recipe} - </h2>
                                <h3 className="text-s1_2">{content.category}</h3>
                            </div>
                            <div className="w-full h-[65%] overflow-hidden">
                                <img className="w-full h-full object-cover" src={content.img} alt={content.name_recipe} />
                            </div>
                            <div className="border-b-[1px] h-[10%] flex flex-col items-center justify-center">
                                <div className={!hasSearch ? 'hidden' : 'block'}>
                                    <h2>Criado por: <span>{content.author}</span></h2>
                                    <p>Agora mesmo</p>
                                </div>
                                <Link to={'/recipe/' + content.id} >
                                    <Button customClass={'btn-primary px-8 mt-4'}>Ver receita</Button>
                                </Link>
                                <Link className="m-2 underline cursor-pointer" to={`/poll?name=${content.name_recipe}`}>Vote como receita do mês</Link>
                            </div>
                            <div className="w-full h-[10%] p-2">
                                <div className="h-1/2">
                                    {
                                        <NumberLoved
                                            nmr_hearts={content.nmr_hearts}
                                            nmr_comments={content.comments.length}
                                        />
                                    }
                                </div>
                                <div className="h-1/2 flex justify-center">
                                    <LikeComentsSaveButtons />
                                </div>
                            </div>
                        </div>

                        <div id="feed-comment" className="w-full flex-col items-center justify-center bg-white border-t-[1px] border-solid py-4 hidden">
                            <div className="flex flex-col max-h-[18rem] overflow-y-auto overflow-x-hidden">
                                {
                                    content.comments.length
                                        ? content.comments.map(comment => {
                                            return <FeedComments
                                                content={content}
                                                comment={comment}
                                            />
                                        })
                                        : <h2>Digite o primeiro comentário dessa receita</h2>
                                }
                            </div>
                            <div className="w-full px-4 py-2 flex items-center">
                                <div className="w-[10%] overflow-hidden rounded-full">
                                    <img className="w-full h-full object-cover" src="https://via.placeholder.com/100" alt={content.author} />
                                </div>
                                <Input
                                    id="InputWriteComment"
                                    placeholder={"Digite um comentário aqui..."}
                                    icon={<RiSendPlaneFill className="text-s1_7 cursor-pointer fill-blue-500"/>}
                                    size={4}
                                />
                            </div>
                        </div>
                    </div>
                )
            }) : <h2 className="text-s1_5 p-4 text-center">Não encontramos sua receita =(</h2>}


        </div>
    )
}