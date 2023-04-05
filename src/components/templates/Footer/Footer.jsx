import { Logo } from '../../atoms/HeaderLogo'
import { SocialMidia } from '../../atoms/HeaderSocialMidia'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { MdSend } from "react-icons/md"
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className='w-full h-auto md:h-[40vh] bg-color_primary flex flex-col items-center mt-8 '>
            <div className="w-full h-full">
                <div className="flex flex-col md:flex-row w-full h-full justify-evenly">

                    <div className="flex flex-col justify-start items-center min-w-1/4 pt-8">
                        <h3 className='text-s2 md:text-s1_7 text-white mb-8'>Nossas politicas</h3>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/">privacidade</a>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/">Termos de uso</a>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/">publicidade</a>
                    </div>


                    <div className="flex flex-col justify-start items-center min-w-1/4 pt-8">
                        <h3 className='text-s2 md:text-s1_7 text-white mb-8'>Sobre</h3>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/">Quem somos?</a>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/">Contato</a>
                        <Link to={'/create/?n='}>
                            <Button customClass='btn-second mt-12 text-s1_4 p-4'>Publique uma receita</Button>
                        </Link>
                    </div>



                    <div className="flex flex-col justify-start items-center min-w-1/4 pt-8">
                        <div className="w-1/4 mb-4 flex justify-center">
                            <Logo />
                        </div>
                        <div className="w-full flex justify-center mb-8">
                            <SocialMidia />
                        </div>
                        <div className="hidden md:flex flex-col text-s1_3 gap-2 text-white text-center mt-8">
                            <h3>Quer receber receitas quentinhas?</h3>
                            <h4>Deixe seu email</h4>
                            <Input

                                className="text-black p-4"
                                placeholder="Digite seu email:"
                                icon={<MdSend onClick={() => alert("E-mail enviado!")} className='text-s2 fill-blue-600  cursor-pointer' />}
                            />
                        </div>
                    </div>


                </div>
            </div>
            <div className="w-full bg-white flex justify-center p-4">
                <span>Site desenvolvido por: <h4>Guilherme Phellippe</h4></span>
            </div>
        </footer>
    )
}
