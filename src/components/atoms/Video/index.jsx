import { useRef } from "react"
import { FaExpand, FaMicrophone, FaMicrophoneSlash, FaPause, FaPlay } from "react-icons/fa";

const Video = ({ src, title }) => {
    const refContainer = useRef();

    const handlePlay = ()=>{
        const vimeoPlayer = refContainer.current.querySelector("iframe")
        const layer = refContainer.current.querySelector("div[data-layer='play']")
        console.log(vimeoPlayer.dataset.play)
        if(vimeoPlayer.dataset.play === "true"){
            if(window.innerWidth <= 680 || window.innerHeight <= 480){
                refContainer.current.classList.remove("fixed", "top-0", "left-0", "z-[1000]")
                refContainer.current.classList.add("relative")
            }
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"0"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"pause"}', '*');
            layer.style.opacity = "1"
            vimeoPlayer.dataset.play = "false"
        }else{
            if(window.innerWidth <= 680 || window.innerHeight <= 480){
                refContainer.current.classList.add("fixed", "top-0", "left-0", "z-[1000]")
                refContainer.current.classList.remove("relative")
            }
            vimeoPlayer.contentWindow.postMessage('{"method":"setVolume", "value":"1"}', '*');
            vimeoPlayer.contentWindow.postMessage('{"method":"play"}', '*');
            layer.style.opacity = "0"
            vimeoPlayer.dataset.play = "true"
        }
    }

    return (
        <div
            ref={refContainer}
            className="w-full h-full relative group cursor-pointer bg-black grid place-items-center"
        >

            <iframe src="https://player.vimeo.com/video/860281939?badge=1&amp;title=0&amp;byline=0&amp;controls=0"
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute top-0 left-0; w-full h-full"
                title="SnapInsta.io-Bolo de paçoca _ Chef Isis Alvarez-(1080p)"
                data-play="false"
            ></iframe>

            {/* <div className={`w-full p-4 absolute bottom-0 left-0 flex justify-around bg-color_orange z-20 ${play === 1 ? "invisible" : "visible"}`}>
                {play === 0 ?
                    <FaPlay className="text-s2 cursor-pointer text-white" onClick={() => setPlay(1)} /> :
                    <FaPause className="text-s2 cursor-pointer text-white" onClick={() => setPlay(0)} />
                }
                {mute === 0 ?
                    <FaMicrophone className="text-s2 cursor-pointer text-white" onClick={() => setMute(1)} /> :
                    <FaMicrophoneSlash className="text-s2 cursor-pointer text-white" onClick={() => setMute(0)} />
                }
                <FaExpand className="text-s2 cursor-pointer text-white" data-expand={true} onClick={handleExpandVideo} />
            </div> */}

            <div 
                className="absolute top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center"
                onClick={handlePlay}
                data-layer="play"
            >
                <FaPlay className="text-s5 cursor-pointer text-white bg-color_orange p-4 rounded-xl"  /> :
            </div>

        </div>
    )
}

export default Video