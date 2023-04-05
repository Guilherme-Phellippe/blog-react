import propTypes from "prop-types"

export const modalMessage = (container, message) => {
    const canExecute = message?.button ? Object.keys(message.button).length > 1 : false
    
    
    const handleRemoveModal = ({ target }) => {
        if(target.dataset.id === "close-modal"){
            container.removeChild(container.lastChild)
        }
    }

    const range = document.createRange()
    range.selectNode(document.body);
    const fragment = range.createContextualFragment(`<div data-id="close-modal" class="fixed w-screen h-screen top-0 left-0 grid place-items-center bg-[#24242440] z-[999]">
        <div class="w-4/5 md:w-1/3 flex flex-col justify-center items-center shadow-sm shadow-color_primary bg-white rounded-2xl p-8">
            <span class="text-orange-700 text-s1_2 w-full text-left">Aviso:</span>
            <h2 class="text-s1_5 my-4 border-b-[1px] text-center pb-4 w-full"></h2>
            <div id="box-buttons" class="w-full flex justify-around p-4">
            </div>
            </div>
            </div>`)
            
            
            fragment.firstChild.addEventListener("click", handleRemoveModal)
    const title = fragment.firstChild.querySelector("h2")
    title.textContent = message.message
    const box = fragment.firstChild.querySelector("#box-buttons")
    
    const buttonOut = document.createElement("button");
    buttonOut.setAttribute("data-id", "close-modal")
    buttonOut.setAttribute("class", `${!canExecute && "btn-primary text-white"} border-[1px] text-color_text rounded-xl px-8 text-s1_2`)
    buttonOut.textContent = canExecute ? "Agora não" : "Ok"
    
    if(canExecute){
        const buttonEvent = document.createElement("button");
        buttonEvent.setAttribute("data-id", "close-modal")
        buttonEvent.setAttribute("class", "btn-primary px-8 text-s1_2")
        buttonEvent.addEventListener("click", message.button.click)
        buttonEvent.textContent = message.button.text
        box.appendChild(buttonEvent)
    }
    
    box.appendChild(buttonOut)
    
    container.appendChild(fragment.firstChild)
}

modalMessage.propTypes = {
    message: propTypes.object
}

