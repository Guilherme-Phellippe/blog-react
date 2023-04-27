import { useEffect, useRef, useState } from "react";
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaExpand, FaExpandAlt, FaItalic } from "react-icons/fa";
import { MdSubdirectoryArrowLeft, MdTitle } from "react-icons/md";

export const TextEditor = ({ text, setText, title, setAlign, align, images }) => {
    const [isExpand, setExpand] = useState(false)
    const [cursorPosition, setCursorPosition] = useState(null)
    const editorRef = useRef(null)

    useEffect(() => {
        if (cursorPosition) {
            const textarea = editorRef.current;
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
            setCursorPosition(null)
        }
    }, [cursorPosition])

    const handleTextArea = ({ target }) => {
        setText(target.value)
    }

    const handleTransformText = (tags) => {
        if (tags.length === 2) {
            const textarea = editorRef.current;
            const startSelection = textarea.selectionStart
            const endSelection = textarea.selectionEnd
            const selectedText = text.substring(startSelection, endSelection);
            const transformText = `${tags[0]}${selectedText}${tags[1]}`
            const newValue = text.substring(0, startSelection) + transformText + text.substring(endSelection)
            setText(newValue)
            setCursorPosition(endSelection + tags[0].length)
        } else throw new Error("The tags need have 2 arguments")
    }

    const handleBreakLine = () => {
        const textarea = editorRef.current;
        const startSelection = textarea.selectionStart
        const endSelection = textarea.selectionEnd
        const newValue = text.substring(0, startSelection) + "<br />" + text.substring(endSelection)
        setText(newValue)
        setCursorPosition(endSelection + '<br />'.length)
    }

    const handleKeyDown = (e) =>{
        if(e.code === "Enter"){
            handleBreakLine()
        }
    }

    const buttons = [
        {
            icon: <FaBold />,
            tooltip: "Negrito",
            event: () => handleTransformText(['<b>', '</b>'])
        },
        {
            icon: <FaItalic />,
            tooltip: "Italico",
            event: () => handleTransformText(['<i>', '</i>'])
        },
        {
            icon: <MdSubdirectoryArrowLeft />,
            tooltip: "Quebra-linha",
            event: handleBreakLine
        },
        {
            icon: <FaAlignCenter />,
            tooltip: "Texto no centro",
            event: () => setAlign('text-center')
        },
        {
            icon: <FaAlignJustify />,
            tooltip: "Texto justificado",
            event: () => setAlign('text-justify')
        },
        {
            icon: <FaAlignLeft />,
            tooltip: "Texto na esquerda",
            event: () => setAlign('text-left')
        },
        {
            icon: <FaAlignRight />,
            tooltip: "Texto na direita",
            event: () => setAlign('text-right')
        },
        {
            icon: <MdTitle />,
            tooltip: "Sub-título",
            event: () => handleTransformText(['<h2 class="text-s1_7">', '</h2>'])
        },
        {
            icon: <FaExpand />,
            tooltip: "Expandir",
            event: () => setExpand(true)
        },
        {
            icon: <FaExpandAlt />,
            tooltip: "Reduzir",
            event: () => setExpand(false)
        },
    ];

    return (
        <div className={`${isExpand ? "fixed top-0 left-0 z-[999] w-screen h-screen" : "w-full min-h-[20rem] md:min-h-[30rem]"} bg-white flex flex-col`}>
            <h2 className="text-s1_5 mb-2">Descreva sua dica:</h2>
            <div className="flex justify-center bg-white">
                {
                    buttons.map((btn, key) =>
                        <div
                            key={key}
                            className="w-full border border-color_orange border-b-none flex justify-center p-4 cursor-pointer text-s1_3 relative group"
                            onClick={btn.event}
                        >
                            {btn.icon}
                            <span className="invisible group-hover:visible absolute bottom-full text-base leading-5 rounded-md text-center transition-all duration-200">{btn.tooltip}</span>
                        </div>
                    )
                }
            </div>
            <textarea
                ref={editorRef}
                className={`w-full min-h-[20rem] border border-color_orange outline-none p-4 text-s1_2 bg-white selection:bg-color_orange`}
                placeholder="Começe a digitar sua dica..."
                value={text}
                onKeyDown={handleKeyDown}
                onChange={handleTextArea}
            ></textarea>
            <div
                className={`w-full p-0 py-4 md:p-8 ${text.length ? 'block' : 'hidden'}`}
                onClick={() => editorRef.current.focus()}
            >
                <h3 className="text-s1_5 text-color_orange py-4 font-bold">Como ficará sua publicação:</h3>
                <div className="flex flex-col bg-gray-500/30 rounded-3xl">
                    <h2 className={`text-left text-color_orange font-semibold text-s2 p-4 ${title.length ? 'block' : 'hidden'}`}>
                        {title}
                    </h2>
                    <div className="flex flex-col items-center">
                        <span className="text-s1 opacity-80">(A Representação da imagem ficará maior na pagina principal)</span>
                        <img className={`${!!images.length ? 'block' : 'hidden'} mx-auto mb-6 w-[150px] object-cover`} src={images[0]?.medium} alt={title} />
                    </div>
                    <div
                        className={`w-full ${align} text-s1_2 p-4 break-words leading-8`}
                        dangerouslySetInnerHTML={{ __html: text }}
                    ></div>
                    <span className={`w-full text-center bg-red-300 text-black text-s1 p-1 ${100 - text.length <= 0 ? 'hidden' : "block"}`}>sua dica precisa ter mais {100 - text.length} letra(s)</span>
                </div>
            </div>
        </div>
    )
}