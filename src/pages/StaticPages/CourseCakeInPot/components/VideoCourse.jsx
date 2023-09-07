import { useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa"
import { useLocation } from "react-router-dom";

const VideoCourse = () => {
    const refContainer = useRef();
    const refProgressBar = useRef();
    const isPlay = useRef(false);
    const isExpand = useRef(false);
    const { search } = useLocation();
    const fromFacebook = search.includes("facebook");
    var intervalVideoWatching;

    const handleClickPlayVideo = () => {
        // eslint-disable-next-line no-undef
        fromFacebook ?  fbq('trackCustom', "video_depoiment_course_cake_pot_fb", { intervalVideoWatching }) : fbq('trackCustom', "video_depoiment_course_cake_pot_tb", { intervalVideoWatching });
        const vimeoPlayer = refContainer.current.querySelector("iframe");
        const layer = refContainer.current.querySelector("div[data-layer='play']");

        if (isPlay.current) {
            stopTimerVideo();
            if (isExpand.current) {
                if (window.innerWidth <= 680 || window.innerHeight <= 480) handleExpandVideo()
            }
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"0"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"pause"}', '*');
            layer.style.opacity = "1"
            isPlay.current = false;
        } else {
            startTimerVideo();
            if (window.innerWidth <= 680 || window.innerHeight <= 480) handleExpandVideo()
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"1"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"play"}', '*');
            layer.style.opacity = "0"
            isPlay.current = true
        }


    }

    const handleExpandVideo = () => {
        if (isExpand.current) {
            refContainer.current.classList.remove("fixed", "top-0", "left-0", "z-[1000]")
            refContainer.current.classList.add("relative")
            isExpand.current = false
        } else {
            refContainer.current.classList.add("fixed", "top-0", "left-0", "z-[1000]")
            refContainer.current.classList.remove("relative")
            isExpand.current = true
        }
    }

    const startTimerVideo = () => {
        var counter = localStorage.getItem("timer_watching") || 0

        intervalVideoWatching = setInterval(() => {
            counter++
            localStorage.setItem("timer_watching", counter)
            const porcent = counter >= 180 ? 100 : Math.floor(counter * 100 / 180)
            refProgressBar.current.querySelector("span").style.transform = `translateX(${porcent}%)`
        }, 1000);
    }

    const stopTimerVideo = () => {
        clearInterval(intervalVideoWatching)
    }

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("timer_watching", 0)
        })
    }, [])



    return (
        <div
            className="w-[95%] h-[320px] md:h-[360px] max-w-[520px] my-12 flex justify-center rounded-3xl overflow-hidden cursor-pointer border-[1px] border-color_orange"
        >
            <div
                ref={refContainer}
                className="w-full h-full relative group cursor-pointer bg-black grid place-items-center"
            >
                <iframe
                    src={`https://player.vimeo.com/video/861074788?badge=1&title=0&byline=0&controls=0`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    className="w-full h-full "
                    title="Vou explicar detalhadamente"
                ></iframe>

                <div
                    ref={refProgressBar}
                    className="w-full h-[50px] absolute bottom-0 left-0 bg-white p-6 z-30 flex items-center gap-2"
                >

                    <div className="w-full h-full overflow-hidden rounded-2xl bg-color_red flex">
                        <span className="w-full h-full border-r-2 bg-zinc-300 -translate-x-full flex items-center"></span>
                    </div>
                </div>

                <div
                    className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center cursor-pointer"
                    onClick={handleClickPlayVideo}
                    data-layer='play'
                >
                    <FaPlay className="fill-white text-s4" />
                </div>
            </div>

        </div>
    )
}

export default VideoCourse