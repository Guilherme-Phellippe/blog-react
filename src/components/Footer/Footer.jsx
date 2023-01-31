import { Logo } from '../Header/childs/Bartop/Logo'
import { SocialMidia } from '../Header/childs/Bartop/SocialMidia'
import { Categories } from '../Header/childs/Menu/Categories'
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
                        <a href="/">Publique sua receita</a>
                    </div>
                    <div className="links">
                        <Logo />
                        <SocialMidia />
                        <h3>Quer receber receitas quentinhas?</h3>
                        <h4>Deixe seu email</h4>
                        <input type="text" placeholder='email@email.com.br' />
                    </div>
                </div>
            </div>
            <div className="dev-credits">
                <span>Site desenvolvido por: <h4>Guilherme Phellippe</h4></span>
            </div>

        </footer>
    )
}