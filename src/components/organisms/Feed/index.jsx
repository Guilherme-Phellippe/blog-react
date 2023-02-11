import { RiCloseCircleFill } from "react-icons/ri"
import { Link } from "react-router-dom"

import { Button } from '../../atoms/Button'
import { NumberLoved } from '../../atoms/NumberLoved'
import { LikeComentsSaveButtons } from "../../molecules/LikeComentSaveButtons"

import './feed.css'

export const Feed = ({ contents, hasSearch }) => {
    const classForSearch = hasSearch ? "style-search" : ''

    return (
        <div className="box-feed-recipe">
            {contents.length ? contents.map((content) => {
                return (
                    <div key={content.id} className={`content-feed-user ${classForSearch}`}>
                        <div className="info-user h-[10%]">
                            <div className="box-photo">
                                <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt={content.author} />
                            </div>
                            <div className="box-name-date">
                                <h2>{content.author}</h2>
                                <p>Agora mesmo</p>
                            </div>
                            <div className="box-utils">
                                <RiCloseCircleFill className="close" />
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
                        </div>
                        <div className="w-full h-[10%] p-2">
                            <div className="h-1/2">
                                {content.nmr_hearts > 0 && <NumberLoved nmr_hearts={content.nmr_hearts} />}
                            </div>
                            <div className="h-1/2 flex justify-center">
                                <LikeComentsSaveButtons />
                            </div>
                        </div>
                    </div>
                )
            }) : <h2 className="text-s1_5 p-4 text-center">Não encontramos sua receita =(</h2>}
        </div>
    )
}