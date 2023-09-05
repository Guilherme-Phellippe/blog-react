import { Suspense, useEffect, useRef, useState } from "react"
import Header from "../../components/templates/Header/Header"
import { HomeProvider } from "../../contexts/Home/HomeProvider"
import { Loading } from "../../components/atoms/Loading/Loading"
import Footer from "../../components/templates/Footer/Footer"
import { Img } from "../../components/atoms/Img"
import Video from "../../components/atoms/Video"



const VacanciesFilled = ({ canExecuteInterval }) => {
    const [vacanciesFilled, setVacanciesFilled] = useState(createArray());

    function createArray() {
        const localStorageVacancies = localStorage.getItem("numberPeopleBuyTheCourse") || 76;
        const newArray = []
        for (let index = 1; index <= 100; index++) {
            index <= localStorageVacancies ?
                newArray.push({ index, isEmpty: true })
                :
                newArray.push({ index, isEmpty: false })
        }
        return newArray
    }

    useEffect(() => {
        if (canExecuteInterval) {
            const interval = setInterval(() => {
                const filteredFilledVacancies = vacanciesFilled.filter(v => v.isEmpty);
                const lastVacancyFilled = filteredFilledVacancies[filteredFilledVacancies.length - 1]
                if (lastVacancyFilled.index <= 98) {
                    var randomNumber = 1
                    if (lastVacancyFilled.index < 97) randomNumber = Math.floor(Math.random() * 4)
                    handleNewVacancies(randomNumber);
                } else clearInterval(interval)
            }, 3000);
            return () => clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canExecuteInterval, vacanciesFilled])


    const handleNewVacancies = (count) => {
        for (let n = 1; n < count; n++) {
            const findFirstVacanciesEmpty = vacanciesFilled.find(vacancy => !vacancy.isEmpty)
            if (findFirstVacanciesEmpty) {
                findFirstVacanciesEmpty.isEmpty = true;
                setVacanciesFilled(v => [...v])
            }
        }
    }



    return (
        <div className="w-4/5 flex flex-wrap gap-2">
            {
                vacanciesFilled.map(vancancy => {
                    const { index } = vancancy
                    return vancancy.isEmpty ?
                        <div key={index} className="w-1/12 flex justify-center items-center bg-green-500 border-[1px] border-green-500">
                            <p>{index <= 9 ? "0" + index : index}</p>
                        </div>
                        :
                        <div key={index} className="w-1/12 flex justify-center items-center bg-zinc-300 border-[1px] border-zinc-400">
                            <p className="opacity-50">{index}</p>
                        </div>
                })
            }
            <h3 className="text-s1_5 my-4">Vagas restantes: <span className="text-s1_7 font-bold text-red-600">{100 - vacanciesFilled.filter(v => v.isEmpty).length}</span></h3>
        </div>
    )
}



const CursoBoloDePote = () => {
    const refContainerAfterPlay = useRef();
    const [isPlay, setPlay] = useState();


    const handlePlayVideo = () => {
        setTimeout(() => {
            refContainerAfterPlay.current.classList.add("flex")
            refContainerAfterPlay.current.classList.remove("hidden")
            setPlay(true)
        }, 30000);
    }

    const handleKnowMore = () => {
        window.location.href = "https://go.hotmart.com/F86370228D"
    }
    const handleBuyNow = () => {
        window.location.href = "https://go.hotmart.com/F86370228D?ap=5873"
    }

    return (
        <HomeProvider>
            <Header />
            <Suspense fallback={<Loading />}>
                <main className="w-full max-w-[1500px] mt-4 mx-auto relative bg-white flex flex-col">

                    <div className="w-full flex flex-col">
                        <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-1/2 py-4 md:m-4 rounded-t-2xl bg-white md:bg-zinc-300 self-center md:self-end shadow-md border-b-4 border-color_orange">
                            <div className="w-2/3 flex flex-col md:items-end order-2 md:order-1">
                                <h2 className="text-s2_5 text-center pt-2 md:p-2 font-medium">Olá, muito prazer!</h2>
                                <h2 className="text-s2 p-2 text-center font-medium">meu nome é Julia.</h2>
                                <h3 className="text-s1_7 md:text-s1_5 text-center md:text-right p-2leading-10 opacity-90">
                                    Estou muito feliz em ver você aqui! Isso significa que assim como eu,
                                    você também deseja sua liberdade financeira, não se preocupe,
                                    eu entendo a sua dor e vou explicar tudinho para você!
                                </h3>
                            </div>
                            <div className="w-[150px] md:w-[200px] h-[150px] md:h-[200px] order-1 md:order-2 overflow-hidden rounded-full">
                                <Img
                                    imgs={"https://i.ibb.co/Ph7Hqc9/conceito-de-felicidade-bem-estar-e-confianca-mulher-afro-americana-atraente-alegre-corte-de-cabelo-e.jpg"}
                                    alt={"foto de julia galvao"}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 flex flex-col items-center self-center md:my-8 bg-[url('https://chefisisalvarez.com.br/wp-content/uploads/2021/06/Fundo-Bolo-no-pote-scaled-1-1.jpg')]">

                            <h2 className="text-s3 py-4 font-medium my-4">Você precisa ver esse video!</h2>

                            <div
                                className="w-[95%] h-[320px] relative my-12 bg-white flex justify-center rounded-3xl cursor-pointer border-[1px] border-color_orange"
                                onClick={handlePlayVideo}
                            >
                                <Video
                                    src="https://player.vimeo.com/video/861074788?h=4c28bdada5"
                                    title={"video-depoiment"}
                                    evFacebook="Click_video_depoiment_julia"
                                    typePlay="triploClick"
                                />
                            </div>

                            <div
                                ref={refContainerAfterPlay}
                                className="flex-col items-center hidden"
                            >
                                <h2 className="text-s2_5 py-4 my-4">Vagas preenchidas em tempo real</h2>
                                <VacanciesFilled canExecuteInterval={isPlay} />
                                <button
                                    onClick={handleBuyNow}
                                    className="animate-grown-in text-s2 text-white shadow-lg shadow-green-600 flex justify-center items-center gap-4 rounded-3xl bg-green-700 w-4/5 py-8 my-16 "
                                >Quero me inscrever agora!</button>

                                <div className="w-full flex flex-col items-center bg-gradient-to-t from-color_orange to-transparent">
                                    <h3 className="py-2 text-s2 text-center mt-[350px] text-white">Ainda não está convencida?</h3>
                                    <button
                                        onClick={handleKnowMore}
                                        className="text-s2 text-black shadow-lg shadow-color_green flex justify-center items-center gap-4 rounded-3xl bg-color_green w-3/5 py-4 my-16 "
                                    >Ver mais sobre o curso!</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </Suspense>
            <Footer />
        </HomeProvider>
    )
}

export default CursoBoloDePote
