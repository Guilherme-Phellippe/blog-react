/**
 * 
 * @param {string} text 
 * @param {number} type 
 * @param {string} buttonText 
 * @returns 
 */
export const captureEmailAndPhoneNumber = (isEmail) => {
    const root = document.querySelector("#root")

    const formatEmailAndNumber = (text) => {
        if (isEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(text);
        } else {
            const numberFormat = text.replace(/[^\d]/g, '');
            if (numberFormat.length === 11) return true
            else return false
        }
    }


    return new Promise((resolve, reject) => {

        const container = document.createElement('div');
        container.setAttribute("class", "fixed top-0 left-0 z-[999] w-screen h-screen bg-black/30 grid place-items-center");

        const box = document.createElement('div');
        box.setAttribute('class', `min-w-[20rem] max-w-[80%] md:max-w-2/3 min-h-[12rem] bg-white p-2 rounded-xl flex flex-col justify-between scale-0 transition-transform duration-500`)
        setTimeout(() => box.classList.add("scale-100"), 50);

        const contentTop = document.createElement('div');
        contentTop.setAttribute('class', "w-full flex-col px-4");

        const contentBottom = document.createElement('div');
        contentBottom.setAttribute('class', "w-full flex justify-center gap-8 border-t p-4")

        const title = document.createElement("h2");
        title.setAttribute("class", `${isEmail ? "text-green-600 bg-green-500/20 " : "text-blue-600 bg-blue-500/20 "}font-bold text-center text-s1_5 py-3 px-8 rounded-t-xl`)
        title.innerText = "BLOG TEM SABOR"

        const message = document.createElement("p");
        message.setAttribute("class", `text-color_text_black text-center text-s1_5 p-8 rounded-t-xl p-4`)
        message.innerText = `Quer receber nossas receitas quentinhas direto no seu ${isEmail ? "e-mail" : "celular"}? 😍 \n Deixe seu contato agora mesmo ...`

        const labelEmailOrNumber = document.createElement("label");
        labelEmailOrNumber.setAttribute("for", `${isEmail ? "email" : "phone"}`)
        labelEmailOrNumber.setAttribute("class", `text-s1_3`)
        labelEmailOrNumber.innerText = `${isEmail ? "E-mail:" : "Número de telefone:"}`


        const inputEmailOrNumber = document.createElement("input");
        inputEmailOrNumber.setAttribute("type", `${isEmail ? "email" : "tel"}`)
        inputEmailOrNumber.setAttribute("name", `${isEmail ? "email" : "phone"}`)
        inputEmailOrNumber.setAttribute("autocomplete", `${isEmail ? "email" : "tel"}`)
        inputEmailOrNumber.setAttribute("placeholder", `${isEmail ? "Digite seu email aqui..." : "Digite seu número de telefone aqui..."}`)
        inputEmailOrNumber.setAttribute("class", `w-full my-4 px-4 py-6 text-s1_5 border-[1px] ${isEmail ? "border-green-500":"border-blue-500"} rounded-xl`)
        inputEmailOrNumber.addEventListener("click", () => {
            inputEmailOrNumber.classList.remove("border-red-500")
            labelErrorInput.classList.add("hidden")
        })

        const labelErrorInput = document.createElement("label");
        labelErrorInput.setAttribute("for", `${isEmail ? "email" : "phone"}`)
        labelErrorInput.setAttribute("class", `text-s1_3 hidden text-red-500`)
        labelErrorInput.innerText = `${isEmail ? "E-mail inválido, verifique e tente novamente!\nEx: Exemplo@exemplo.com" : "Número de telefone inválido, adicione o ddd + número com o digito 9\nTente novamente!"}`

        const buttonClose = document.createElement('button')
        buttonClose.setAttribute("class", `text-s1_3 p-2 px-4 text-color_text_black border rounded-xl`)
        buttonClose.innerHTML = "Não, obrigado"
        buttonClose.addEventListener('click', () => {
            box.classList.remove("scale-100")
            setTimeout(() => {
                root.removeChild(container)
                resolve(false)
            }, 500)
        })

        const buttonConfirm = document.createElement('button')
        buttonConfirm.setAttribute("class", `${isEmail ? "bg-green-500" : "bg-blue-500"} text-s1_3 p-2 px-6 text-white border rounded-xl`)
        buttonConfirm.innerHTML = "Enviar"
        buttonConfirm.addEventListener('click', () => {
            if (formatEmailAndNumber(inputEmailOrNumber.value)) {
                box.classList.remove("scale-100")
                setTimeout(() => {
                    root.removeChild(container)
                    resolve({ data: inputEmailOrNumber.value })
                }, 500)
            } else {
                inputEmailOrNumber.classList.add("border-red-500")
                labelErrorInput.classList.remove("hidden")
            }
        })

        contentTop.appendChild(title)
        contentTop.appendChild(message)
        contentTop.appendChild(labelEmailOrNumber)
        contentTop.appendChild(inputEmailOrNumber)
        contentTop.appendChild(labelErrorInput)
        contentBottom.appendChild(buttonClose)
        contentBottom.appendChild(buttonConfirm)
        box.appendChild(contentTop)
        box.appendChild(contentBottom)
        container.appendChild(box)


        root.appendChild(container)
    })
}