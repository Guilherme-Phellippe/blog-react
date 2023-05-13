export const dialog = (text , type, buttonText) => {
    const root = document.querySelector("#root")
    const color = type === 0 ? "red-500" : type === 1 ? "color_orange" : "green-500"

    return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        container.setAttribute("class", "fixed top-0 left-0 w-screen h-screen bg-black/30 grid place-items-center");

        const box = document.createElement('div');
        box.setAttribute('class', `min-w-[20rem] max-w-[60%] md:max-w-2/3 min-h-[12rem] bg-white p-2 rounded-xl flex flex-col justify-between border-[1px] border-${color}`)

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex-col");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "w-full flex justify-center gap-8 border-t p-4")

        const title = document.createElement("h2");
        title.setAttribute("class", `text-${color} bg-${color}/20 font-bold text-center text-s1_5 py-3 px-8 rounded-t-xl`)
        title.innerText = "BLOG TEM SABOR"

        const message = document.createElement("p");
        message.setAttribute("class", `text-color_text_black text-center text-s1_5 p-8 rounded-t-xl p-4`)
        message.innerText = text

        const buttonClose = document.createElement('button')
        buttonClose.setAttribute("class", `text-s1_3 p-2 px-4 text-color_text_black/80 border rounded-xl`)
        buttonClose.innerHTML = buttonText ? "Fechar" : "OK"
        buttonClose.addEventListener('click', () => {
            root.removeChild(container)
            resolve(false)
        })

        const buttonConfirm = document.createElement('button')
        buttonConfirm.setAttribute("class", `bg-${color} text-s1_3 p-2 px-6 text-white border rounded-xl`)
        buttonConfirm.innerHTML = buttonText
        buttonConfirm.addEventListener('click', () => {
            root.removeChild(container)
            resolve(true)
        })

        contentTop.appendChild(title)
        contentTop.appendChild(message)
        contentBottom.appendChild(buttonClose)
        buttonText && contentBottom.appendChild(buttonConfirm)
        box.appendChild(contentTop)
        box.appendChild(contentBottom)
        container.appendChild(box)


        root.appendChild(container)
    })
}