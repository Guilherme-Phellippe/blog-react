
import { CSSTransition } from 'react-transition-group';


import './banner.css'

export const Banner = ({ hide }) => {

    console.log(!!hide)

    return (
        <CSSTransition
            in={!hide}
            timeout={100}
            onExit={() => !!hide }
        >
            {state => (
                <div className={`container-banner ${state}`}>
                    <img src="https://i.ibb.co/QnyS04q/Tem-Sabor.jpg" alt="Imagem banner" />
                </div>
            )}
        </CSSTransition>
    )
}