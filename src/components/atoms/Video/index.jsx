import { useRef } from "react"
import { FaExpand, FaPause, FaPlay } from "react-icons/fa";

const Video = ({ src, title, controls, evFacebook }) => {
    const refContainer = useRef();
    const refControls = useRef();
    const refProgress = useRef();
    const isPlay = useRef(false);
    const isExpand = useRef(false);

    const handlePlay = () => {

        // eslint-disable-next-line no-undef
        fbq('trackCustom', evFacebook);
        const vimeoPlayer = refContainer.current.querySelector("iframe")
        const layer = refContainer.current.querySelector("div[data-layer='play']")
        if (isPlay.current) {
            if (isExpand.current) {
                if (window.innerWidth <= 680 || window.innerHeight <= 480) handleExpandVideo()
            }
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"0"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"pause"}', '*');
            layer.style.opacity = "1"
            refControls.current?.querySelector("#play").classList.remove("hidden")
            refControls.current?.querySelector("#pause").classList.add("hidden")
            isPlay.current = false;
        } else {
            if (window.innerWidth <= 680 || window.innerHeight <= 480) handleExpandVideo()
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"1"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"play"}', '*');
            layer.style.opacity = "0"
            refControls.current?.querySelector("#play").classList.add("hidden")
            refControls.current?.querySelector("#pause").classList.remove("hidden")
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

    return (
        <div
            ref={refContainer}
            className="w-full h-full relative group cursor-pointer bg-black grid place-items-center"
        >

            <iframe src={`${src}?badge=1&title=0&byline=0&controls=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute top-0 left-0; w-full h-full"
                title={title}
                data-play="false"
            ></iframe>

            {
                <div
                    ref={refControls}
                    className={`w-full p-4 absolute bottom-0 left-0 flex justify-between bg-color_orange z-20`}
                >
                    <div className="w-1/5 flex justify-center">
                        <FaPlay
                            id="play"
                            className="text-s2 cursor-pointer text-white"
                            onClick={handlePlay}
                            data-layer="play"
                        />
                        <FaPause
                            id="pause"
                            className="text-s2 cursor-pointer text-white hidden"
                            onClick={handlePlay}
                            data-layer="pause"
                        />
                    </div>
                    <div className="w-3/5">
                        <div
                            className="w-full h-full flex bg-zinc-100 overflow-hidden"
                            ref={refProgress}
                        >
                            <span className="w-full h-full bg-color_orange/50"></span>
                        </div>
                    </div>
                    <div className="w-1/5 flex justify-center">
                        <FaExpand className="text-s2 cursor-pointer text-white" data-expand={true} onClick={handleExpandVideo} />
                    </div>
                </div>
            }


            <div
                className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center"
                onClick={handlePlay}
                data-layer="play"
            >
                <FaPlay className="text-s5 cursor-pointer text-white bg-color_orange p-4 rounded-xl" /> :
            </div>

        </div>
    )
}

export default Video