import { FaHeart, FaInfoCircle, FaSave } from "react-icons/fa"
import { RiCloseCircleFill, RiMessage2Fill } from "react-icons/ri"
import { Button } from "../../utils/Button"

import './feed.css'

export const Feed = ({ contents, hasSearch }) => {

    const classForSearch = hasSearch ? "style-search" : ''

    return (
        <div className="box-feed-recipe">
            {contents.length ? contents.map((content) => {
                return (
                    <div className={`content-feed-user ${classForSearch}`}>
                        <div className="info-user">
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
                        <div className="content-feed">
                            <img src={content.img} alt={content.name_recipe} />
                        </div>
                        <div className="box-ingredients">
                            <h3>{content.category}</h3>
                            <h2>{content.name_recipe}</h2>
                            <div className="box-hidden-for-search">
                                <h2>Criado por: <span>{content.author}</span></h2>
                                <p>Agora mesmo</p>
                                <Button text="Ver receita"/>
                            </div>
                            <p>
                                1kg de arroz <br />
                                8 litros de leite <br />
                                12 abacates <br />
                                1 galinha <br />
                            </p>
                            <a href="#">Saiba mais</a>
                        </div>
                        <div className="box-buttons">
                            <div className="info-loved">
                                {content.nmr_hearts > 0 &&
                                    <>
                                        <div className="hearts">
                                            <FaHeart />
                                            <FaHeart />
                                            <FaHeart />
                                        </div>
                                        <p>{content.nmr_hearts} pessoas amaram essa receita</p>
                                    </>
                                }
                            </div>
                            <div className="all-buttons">
                                <button className="heart"><FaHeart /> Amei</button>
                                <button className="message"><RiMessage2Fill /> Comentar</button>
                                <button className="save"><FaSave /> Salvar</button>
                            </div>
                        </div>
                    </div>
                )
            }) : <h2>Não encontramos sua receita =(</h2>}
        </div>
    )
}