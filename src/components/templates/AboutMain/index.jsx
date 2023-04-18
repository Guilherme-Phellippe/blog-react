import { Link } from "react-router-dom"
import { SocialMidia } from "../../atoms/HeaderSocialMidia"
import { Button } from "../../atoms/Button"


export const AboutMain = () => {
    return (
        <main className="w-full max-w-[1500px] mx-auto bg-white my-20">
            <div className="flex flex-col  items-center gap-4 p-8">
                <h1 className="p-4 mt-8 text-s2_5 text-center font-semibold text-color_orange">Sobre nossa marca</h1>
                <div className="flex flex-col md:flex-row gap-4 p-12">
                    <div className="w-full md:w-1/3">
                        <img
                            className="w-full h-full object-cover"
                            src="https://i.ibb.co/cwVs9t8/Design-sem-nome-4.webp"
                            alt="imagem sobre nós mulheres felizes por fundar a tem sabor"
                        />
                    </div>
                    <div className="w-full md:w-2/3 flex flex-col justify-center text-center gap-4 mt-8">
                        <p className="text-s1_7 leading-[25px]">
                            Bem-vindo ao nosso site de receitas e culinária! Somos um grupo de mulheres apaixonadas pela arte de cozinhar, e fundamos este blog em 2022 para compartilhar nossas receitas favoritas com outras pessoas que também amam cozinhar.
                        </p>
                        <p className="text-s1_7 leading-[25px]">
                            Nós acreditamos que a culinária é uma forma maravilhosa de se expressar e conectar com outras pessoas, e nosso objetivo é ajudar a inspirar e aprimorar as habilidades culinárias de todos aqueles que visitam nosso site.
                        </p>
                        <p className="text-s1_7 leading-[25px]">
                            Nós compartilhamos receitas de todas as categorias, desde pratos principais até sobremesas, e estamos sempre experimentando novos ingredientes e técnicas de culinária para expandir nossos horizontes e compartilhar nossas descobertas com nossos leitores.
                        </p>
                        <p className="text-s1_7 leading-[25px]">
                            Nosso site é dedicado a todas as pessoas que desejam aprender mais sobre culinária e desfrutar de deliciosas refeições caseiras. Esperamos que você se sinta em casa aqui e que nossas receitas inspirem você a experimentar novas ideias na cozinha.
                        </p>
                    </div>
                </div>



                <div className="w-full flex flex-col justify-center gap-4">
                    <div className="w-full flex justify-center">
                        <img src="https://i.ibb.co/KqW1qd8/Cozinhar-uma-arte.webp" alt="imagem ilustrando nossa paixão pela cozinha" />
                    </div>

                    <div className="flex flex-col gap-4 w-5/6 mx-auto mt-8">
                        <p className="text-s1_7 text-center leading-[25px]">
                            Cozinhar é uma arte que envolve muito mais do que apenas preparar comida. É um ato de amor, dedicação e criatividade que permite expressar nossos sentimentos mais profundos e nossa paixão pela vida. Quando estamos cozinhando, nos entregamos completamente ao processo, desde a escolha dos ingredientes até a finalização do prato. É uma atividade que nos permite usar nossa imaginação e experimentar novos sabores, aromas e texturas.
                        </p>
                        <p className="text-s1_7 text-center leading-[25px]">
                            Para muitos de nós, cozinhar é uma maneira de nos conectar com nossas raízes culturais, com nossa família e com nossos amigos. Cada receita que preparamos tem sua própria história, seu próprio significado e suas próprias memórias. Quando cozinhamos, nos sentimos em casa, em um lugar onde podemos ser nós mesmos e compartilhar nossa paixão com os outros.
                        </p>
                        <p className="text-s1_7 text-center leading-[25px]">
                            A paixão pela culinária também nos permite explorar diferentes culturas e tradições culinárias, nos conectando com pessoas de todo o mundo. Através da comida, podemos aprender sobre a história, a geografia e a cultura de um país e experimentar novas sensações e emoções.
                        </p>
                        <p className="text-s1_7 text-center leading-[25px]">
                            Mas, acima de tudo, cozinhar é uma maneira de cuidar de nós mesmos e dos outros. Quando preparamos uma refeição para alguém, estamos mostrando nosso amor e nosso cuidado, estamos nutrindo não apenas seus corpos, mas também suas almas. É uma maneira de demonstrar afeto e gratidão, de criar memórias duradouras e de deixar uma marca positiva na vida das pessoas.
                        </p>
                        <p className="text-s1_7 text-center leading-[25px]">
                            Em resumo, cozinhar é muito mais do que apenas preparar comida. É uma arte que nos permite expressar nossos sentimentos e nossa paixão pela vida, nos conectar com nossas raízes culturais e explorar diferentes culturas e tradições culinárias. É uma maneira de cuidar de nós mesmos e dos outros, de criar memórias duradouras e de deixar uma marca positiva no mundo.
                        </p>
                    </div>

                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 mt-16">
                    <h2 className="p-4 mt-8 text-s2_5 text-center font-semibold text-color_orange">Organizadores e Responsavéis</h2>

                    <p className="text-s1_7 text-justify leading-[25px]">
                        Criar um blog como mulher pode ser desafiador em um ambiente predominantemente masculino.
                        A Alk Company nos ajudou a superar essas dificuldades, oferecendo um serviço completo e
                        personalizado que nos permitiu criar um meio de comunicação onde podemos compartilhar nossas paixões.
                        Agradecemos à Alk Company por nos ajudar a realizar nossos sonhos e inspirar outras mulheres a fazer o mesmo.
                    </p>

                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 mt-16">
                    <h2 className="text-s2 text-center font-semibold text-color_orange">Nossas redes sociais</h2>
                    <SocialMidia />
                    <p className="flex flex-col gap-4 text-s1_5 mt-8 opacity-75"><span>Fale com a gente:</span>contato@temsabor.blog </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4 mt-16">
                    <h2 className="text-s2_5 text-center font-semibold text-color_orange">Mostre-nos uma receita:</h2>
                    <Link to={'/create/'}>
                        <Button customClass="btn-primary mt-8 text-s2 px-8 mb-8">Criar uma receita</Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}