export const promptModal = (text, showEmoji) => {
    const root = document.querySelector("#root")

    return new Promise((resolve, reject) => {
        var textInput = ''
        const emojisList = [
            "😍", "🥰", "😋", "🥹", "🥺", "😁", "😊", "😉", "😌",
            "😎", "😞", "😱", "😭", "😅", "😂", "🤔", "🤭", "🥵", "🥶"
        ]

        const container = document.createElement('div');
        container.setAttribute("class", "fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-items-center");

        const box = document.createElement('div');
        box.setAttribute('class', `min-w-[20rem] max-w-[80%] md:max-w-2/3 min-h-[12rem] bg-white p-2 rounded-xl flex flex-col justify-between border-[1px] border-color_orange`)

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex-col items-center");
        contentTop.setAttribute('id', "container-top");

        const contentEmojis = document.createElement('div');
        contentEmojis.setAttribute('class', "w-full flex flex-row flex-wrap justify-center max-w-[300px]");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "w-full flex justify-center gap-8 border-t p-4")

        const title = document.createElement("h2");
        title.setAttribute("class", `text-color_orange bg-color_orange/20 font-bold text-center text-s1_5 py-3 px-8 rounded-t-xl`)
        title.innerText = "BLOG TEM SABOR"

        const titleInput = document.createElement("p");
        titleInput.setAttribute("class", `text-color_text_black text-s1_5 text-center rounded-t-xl p-4`)
        titleInput.textContent = text

        const message = document.createElement("textarea");
        message.setAttribute("class", `text-color_text_black text-s1_5 rounded-xl p-4 my-4 border border-color_orange outline-none w-full min-h-[80px] resize-none`)
        message.addEventListener("change", (e) => {
            if (e.target.value.length !== 0) {
                textInput = e.target.value
                buttonClose.disabled = false
                buttonConfirm.disabled = false
            }
        })

        const buttonClose = document.createElement('button')
        buttonClose.setAttribute("class", `text-s1_3 p-2 px-4 text-color_text_black border rounded-xl`)
        buttonClose.disabled = true
        buttonClose.innerHTML = "Fechar"
        buttonClose.addEventListener('click', () => {
            root.removeChild(container)
            resolve(false)
        })

        const buttonConfirm = document.createElement('button')
        buttonConfirm.setAttribute("class", `bg-color_orange text-s1_3 p-2 px-6 text-white border rounded-xl`)
        buttonConfirm.disabled = true
        buttonConfirm.innerHTML = "Enviar"
        buttonConfirm.addEventListener('click', () => {
            root.removeChild(container)
            resolve(textInput)
        })

        emojisList.forEach((emoji) => {
            let emojis = document.createElement("p");
            emojis.setAttribute("class", `text-color_text_black text-s1_5 rounded-xl p-1 text-center m-2 border cursor-pointer`)
            emojis.innerHTML = emoji
            emojis.addEventListener("click", ({ target }) => {
                const textArea = target.closest("div#container-top").querySelector("textarea")
                textArea.value += target.textContent
                textArea.focus()
            })
            contentEmojis.appendChild(emojis)
        })


        contentTop.appendChild(title)
        contentTop.appendChild(titleInput)
        contentTop.appendChild(message)
        showEmoji && contentTop.appendChild(contentEmojis)
        contentBottom.appendChild(buttonClose)
        contentBottom.appendChild(buttonConfirm)
        box.appendChild(contentTop)
        box.appendChild(contentBottom)
        container.appendChild(box)


        root.appendChild(container)
    })
}