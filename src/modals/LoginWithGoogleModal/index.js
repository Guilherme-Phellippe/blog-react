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
        container.setAttribute("class", "fixed bottom-0 left-0 z-[999] w-screen h-screen");

        const box = document.createElement('div');
        box.setAttribute('class', `min-w-[20rem] max-w-[80%] md:max-w-2/3 min-h-[12rem] bg-white p-2 rounded-xl flex flex-col justify-between border-[1px]`)

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex-col");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "w-full flex justify-center gap-8 border-t p-4")

        const title = document.createElement("h2");
        title.setAttribute("class", `text-color_text_black font-bold text-center text-s1_5 py-3 px-8 rounded-t-xl`)
        title.innerText = "Faça login com o google"

        root.appendChild(container)
    })
}