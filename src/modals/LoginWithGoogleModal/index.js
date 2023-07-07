/**
 * 
 * @param {string} text 
 * @param {number} type 
 * @param {string} buttonText 
 * @returns 
 */
export const loginWithGoogleModal = () => {
    const root = document.querySelector("#root")

    return new Promise((resolve, reject) => {
        const container = document.createElement('div');
        container.setAttribute("class", "fixed bottom-0 left-0 z-[999] w-screen h-screen flex items-end");

        const box = document.createElement('div');
        box.setAttribute('class', `w-screen bg-white p-2 rounded-t-xl`)

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex-col");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "w-full flex justify-center gap-8 border-t p-4")

        const title = document.createElement("h2");
        title.setAttribute("class", `text-color_text_black font-bold text-center text-s1_5 py-3 px-8 rounded-t-xl`)
        title.innerText = "Faça login com o google"

        const message = document.createElement("p");
        message.setAttribute("class", `text-color_text_black text-center text-s1_5 p-8 rounded-t-xl p-4`)
        message.innerText = ""

        contentTop.appendChild(title)
        contentTop.appendChild(message)
        box.appendChild(contentTop)
        box.appendChild(contentBottom)
        container.appendChild(box)


        root.appendChild(container)
    })
}