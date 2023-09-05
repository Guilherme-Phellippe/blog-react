import { useEffect, useRef, useState } from "react"
import VideoCourse from "./components/VideoCourse";
import WelcomeCard from "./components/WelcomeCard";
import VacanciesFilled from "./components/VacanciesFilled";


const CursoBoloDePote = () => {
    const [showButtonBuy, setButtonBuy] = useState();

    useEffect(() => {

        const interval = setInterval(() => {
            const watchingVideo = localStorage.getItem("timer_watching");
            if (Number(watchingVideo) >= 180) {
                setButtonBuy(true)
                clearInterval(interval)
            }
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    const handleKnowMore = () => {
        window.location.href = "https://go.hotmart.com/F86370228D"
    }
    const handleBuyNow = () => {
        window.location.href = "https://go.hotmart.com/F86370228D?ap=5873"
    }

    return (
        <main className="w-full max-w-[1500px] min-h-screen mx-auto relative bg-[url('https://chefisisalvarez.com.br/wp-content/uploads/2021/06/Fundo-Bolo-no-pote-scaled-1-1.jpg')] flex flex-col">

            <div className="w-full flex flex-col">
                <WelcomeCard />

                <div className="w-full flex flex-col items-center">

                    <div className="w-full flex flex-col items-center">


                        <div className="flex flex-col items-center md:mt-32">
                            <h2 className="text-s2_5 py-4 font-medium mt-16 text-color_orange">Você precisa <span className="underline text-color_orange font-bold">ver esse video!</span></h2>
                            <h3 className="text-s1_7 py-2 px-4 text-center text-color_text_black">
                                Esse não será o video mais bonito que você verá hoje, mas será o <span className="font-medium">ÚNICO </span>
                                capaz <br /><span className="underline font-medium">transformar sua vida.</span>
                            </h3>
                        </div>

                        <VideoCourse />


                        {
                            showButtonBuy &&
                            <div className="w-full flex flex-col items-center " >
                                <h2 className="text-s2_5 py-4 my-4">Vagas preenchidas em tempo real</h2>
                                <VacanciesFilled />
                                <button
                                    onClick={handleBuyNow}
                                    className="w-4/5 py-8 my-16 max-w-[350px] animate-grown-in text-s2 text-white shadow-lg bg-color_orange  shadow-color_orange flex justify-center items-center gap-4 rounded-3xl  "
                                >Quero me inscrever agora!</button>

                                <div className="w-full flex flex-col items-center bg-gradient-to-t from-color_orange to-transparent">
                                    <h3 className="py-2 text-s2_5 text-center mt-[350px] text-white">Ainda não está convencida?</h3>
                                    <button
                                        onClick={handleKnowMore}
                                        className="text-s2 text-black shadow-lg shadow-color_green flex justify-center items-center gap-4 rounded-3xl bg-color_green w-3/5 py-4 my-16 "
                                    >Ver mais sobre o curso!</button>
                                </div>
                            </div>
                        }
                    </div>


                </div>
            </div>
        </main>
    )
}

export default CursoBoloDePote
