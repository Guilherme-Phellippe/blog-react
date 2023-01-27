import { FaHeart, FaInfoCircle, FaSave } from "react-icons/fa"
import { RiCloseCircleFill, RiMessage2Fill } from "react-icons/ri"

import './feed.css'

export const Feed = ({ contents }) => {
    return (
        <div className="box-feed-recipe">
            {contents.length && contents.map((content) => {
                return (
                    <div className="content-feed-user">
                        <div className="info-user">
                            <div className="box-photo">
                                <img src="https://www.procurandocraques.com/static/img/admin/user-profile.png" alt={content.author} />
                            </div>
                            <div className="box-name-date">
                                <h2>{content.author}</h2>
                                <p>Agora mesmo</p>
                            </div>
                            <div className="box-utils">
                                <FaInfoCircle />
                                <RiCloseCircleFill className="close" />
                            </div>
                        </div>
                        <div className="content-feed">
                            <img src={content.img} alt={content.name_recipe} />
                        </div>
                        <div className="box-ingredients">
                            <h2>{content.name_recipe}</h2>
                            <br />
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
            })}
        </div>
    )
}