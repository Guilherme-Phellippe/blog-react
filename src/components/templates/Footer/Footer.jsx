import { Logo } from '../../atoms/HeaderLogo'
import { SocialMidia } from '../../molecules/HeaderSocialMidia'
import { Categories } from '../../molecules/HeaderSubCategories/Categories'
import { Button } from '../../atoms/Button'

import './footer.css'
export const Footer = () => {
    return (
        <footer>
            <div className="content-footer">
                <div className="container-links">
                    <div className="links">
                        <h3>Principais categorias</h3>
                        <Categories />
                    </div>
                    <div className="links">
                        <h3>Nossas politicas</h3>
                        <a href="/">privacidade</a>
                        <a href="/">Termos de uso</a>
                        <a href="/">publicidade</a>
                        <a href="/">Trocas e devoluções</a>
                    </div>
                    <div className="links">
                        <h3>Sobre</h3>
                        <a href="/">Quem somos?</a>
                        <a href="/">Contato</a>
                        <Button typeButton='second'>Publique sua recita</Button>
                    </div>
                    <div className="box-four">
                        <Logo />
                        <SocialMidia />
                        <div className="newsletter">
                            <h3>Quer receber receitas quentinhas?</h3>
                            <h4>Deixe seu email</h4>
                            <input type="text" placeholder='email@email.com.br' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="dev-credits">
                <span>Site desenvolvido por: <h4>Guilherme Phellippe</h4></span>
            </div>
        </footer>
    )
}