import { Suspense } from "react";
import { Img } from "../../components/atoms/Img";
import Header from "../../components/templates/Header/Header";
import { HomeProvider } from "../../contexts/Home/HomeProvider";
import { Loading } from "../../components/atoms/Loading/Loading";
import Footer from "../../components/templates/Footer/Footer";

export default function Maintenance() {
    return (
        <HomeProvider>
            <Header />
            <Suspense fallback={<Loading />}>
                <div className="flex flex-col bg-white items-center p-8">
                    <h1 className="text-s3 p-4 font-bold text-color_text_black">Estamos em manutenção</h1>
                    <div className="max-w-[400px]">
                        <Img
                            imgs={"https://i.ibb.co/0qMRjH1/Design-sem-nome-23.jpg"}
                            alt={"Em manutenção"}
                        />
                    </div>
                    <h2 className="text-s2 p-4 w-1/2 text-center leading-[25px] text-color_text_black">
                        A Tem sabor agredece a sua visita, 
                        mas no momento estamos realizando melhorias em nosso blog, 
                        sua expẽriencia e segurança aqui é muito importante para nós
                    </h2>
                    <h3 className="w-1/2 text-center text-color_orange font-bold text-s1_5 py-8">Voltamos logo!</h3>
                </div>
                <Footer />
            </Suspense>
        </HomeProvider>
    )
}