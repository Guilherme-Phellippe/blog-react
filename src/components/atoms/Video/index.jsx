import { useRef, useState } from "react"
import { FaExpand, FaMicrophone, FaMicrophoneSlash, FaPause, FaPlay } from "react-icons/fa";

const Video = ({ src, title }) => {
    const refContainer = useRef();
    const [play, setPlay] = useState(0);
    const [mute, setMute] = useState(0);

    const handleClickVideo = () => {
        setPlay(v => v === 1 ? 0 : 1)
        refContainer.current.classList.remove("relative")
        refContainer.current.classList.add("fixed", "top-0", "left-0", "z-[1000]")
    }

    const handleExpandVideo = ({ currentTarget }) => {
        const isExpand = currentTarget.dataset.expand
        if (isExpand === "true") {
            refContainer.current.classList.remove("relative")
            refContainer.current.classList.add("fixed", "top-0", "left-0", "z-[1000]")
            currentTarget.dataset.expand = false
        } else {
            refContainer.current.classList.remove("fixed", "top-0", "left-0", "z-[1000]")
            refContainer.current.classList.add("relative")
            currentTarget.dataset.expand = true

        }
    }

    return (
        <div
            ref={refContainer}
            className="w-full h-full relative group cursor-pointer bg-black grid place-items-center"
        >
            <iframe
                src={`${src}?controls=0&autoplay=${play}&mute=${mute}`}
                title={title}
                className="w-full max-h-[300px] md:max-h-none h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            ></iframe>
            <div className={`w-full p-4 absolute bottom-0 left-0 flex justify-around bg-color_orange z-20 ${play === 1 ? "invisible" : "visible"}`}>
                {play === 0 ?
                    <FaPlay className="text-s2 cursor-pointer text-white" onClick={() => setPlay(1)} /> :
                    <FaPause className="text-s2 cursor-pointer text-white" onClick={() => setPlay(0)} />
                }
                {mute === 0 ?
                    <FaMicrophone className="text-s2 cursor-pointer text-white" onClick={() => setMute(1)} /> :
                    <FaMicrophoneSlash className="text-s2 cursor-pointer text-white" onClick={() => setMute(0)} />
                }
                <FaExpand className="text-s2 cursor-pointer text-white" data-expand={true} onClick={handleExpandVideo} />
            </div>
            <div
                onClick={handleClickVideo}
                className="absolute w-full h-full top-0 left-0 z-10"
            ></div>
        </div>
    )
}

export default Video