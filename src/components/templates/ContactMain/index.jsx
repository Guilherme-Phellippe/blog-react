import { useState } from "react"
import { Button } from "../../atoms/Button"
import { MdCall, MdEmail } from "react-icons/md"

export const ContactMain = () => {
    const [showEmail, setShowEmail] = useState(false)

    const handleCallWhatsapp = () => {
        window.open("https://wa.me/5535991368790?text=Estou precisando de ajuda no blog Tem sabor", "_blank")
    }

    const handleCallEmail = () => {
        setShowEmail(v => !v)
    }


    return (
        <div className="flex flex-col items-center w-full max-w-[1500px] mx-auto bg-white p-8">
            <h2 className="text-center text-s2_5 text-color_orange p-4 font-semibold">Fale conosco:</h2>
            <p className="w-1/2 text-s1_5 text-center my-4 leading-10">
                Valorizamos muito as suas opiniões, dúvidas, críticas, elogios e sugestões,
                pois elas nos ajudam a aprimorar os serviços oferecidos pela nossa equipe.
            </p>
            <p className="w-1/2 text-s1_5 text-center my-4 leading-10">
                Gostaríamos de destacar que todas as mensagens recebidas são lidas, mas,
                devido ao grande volume de e-mails que recebemos diariamente,
                nem sempre conseguimos oferecer suporte individual para todos os usuários do site.
            </p>
            <p className="w-1/2 text-s1_5 text-center my-4 leading-10">
                Se tiver dúvidas sobre como lidamos com seus dados pessoais e sua privacidade,
                por favor envie um e-mail ou whatsapp para nossa equipe de privacidade.
                Agradecemos antecipadamente pelo seu contato e esperamos continuar a oferecer um serviço de qualidade para você.
            </p>
            <h3 className="text-s2 p-4">Como desejar falar conosco?</h3>
            <div className="flex flex-col gap-8 w-1/2 my-8">
                <Button
                    event={handleCallEmail}
                    className="btn-primary p-4 bg-red-600 border border-black text-s1_3 flex justify-center "
                >
                    <MdEmail /> E-mail
                </Button>

                {
                    showEmail &&
                    <div className="flex flex-col items-center">
                        <h3 className="text-s1_5 p-4">Entre em contato conosco:</h3>
                        <a
                            className="text-s1_2"
                            href="mailto:contato@temsabor.blog"
                            target="_blank"
                            rel="noreferrer"
                        >contato@temsabor.blog</a>
                    </div>
                }

                <Button
                    event={handleCallWhatsapp}
                    className="btn-primary p-4 bg-green-600 border border-black text-s1_3 flex justify-center "
                >
                    <MdCall /> Whatsapp
                </Button>
            </div>
        </div>
    )
}