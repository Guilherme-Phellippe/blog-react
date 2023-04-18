import { Logo } from '../../atoms/HeaderLogo'
import { SocialMidia } from '../../atoms/HeaderSocialMidia'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { MdSend } from "react-icons/md"
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <footer className='w-full h-auto md:h-[40vh] bg-color_orange flex flex-col items-center mt-20 '>
            <div className="w-full h-full">
                <div className="flex flex-col md:flex-row w-full h-full justify-evenly">

                    <div className="flex flex-col justify-start items-center w-full md:w-1/4 pt-8">
                        <h3 className='text-s2 md:text-s1_7 text-white mb-8'>Nossos parceiros</h3>
                        <p className='text-s1_5 md:text-s1_3 text-white px-4 text-center' > Nosso blog ainda é totalmente independente,
                            mas estamos em busca de patrocinadores que queiram apoiar o nosso trabalho
                            e fazer parte da nossa comunidade de leitores e seguidores. Com um público engajado e fiel,
                            oferecemos oportunidades valiosas para empresas e indivíduos que desejam alcançar um público mais amplo
                            e consolidar sua presença no mercado.</p>
                    </div>
                    <div className="flex flex-col justify-start items-center min-w-1/4 pt-8">
                        <h3 className='text-s2 md:text-s1_7 text-white mb-8'>Nossas politicas</h3>
                        <Link to={'/policy'}>
                            <span className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer'>Privacidade</span>
                        </Link>
                        <Link to={'/policy?type=terms'}>
                            <span className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer'>Termos de uso</span>
                        </Link>
                        <Link to={'/policy'}>
                            <span className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer'>Publicidade</span>
                        </Link>
                    </div>


                    <div className="flex flex-col justify-start items-center min-w-1/4 pt-8">
                        <h3 className='text-s2 md:text-s1_7 text-white mb-8'>Sobre</h3>
                        <a className='text-s1_5 md:text-s1_3 text-white underline my-4 cursor-pointer' href="/about">Quem somos?</a>
                        <div className="flex flex-col gap-4 items-center text-s1_3 mb-8">
                            <p className='text-white/80 mt-2'>Fale conosco:</p>
                            <span className='text-white font-bold'>contato@temsabor.blog</span>
                        </div>
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
                        <div className="hidden md:flex flex-col text-s1_3 gap-2 text-center mt-8">
                            <h3 className=' text-white '>Quer receber receitas quentinhas?</h3>
                            <h4 className=' text-white '>Deixe seu email</h4>
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
