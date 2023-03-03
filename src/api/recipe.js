import axios from "axios"


export async function getAllRecipes() {
    return fetch("http://localhost:3438/recipes")
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => {
            return err
        })
}

export async function getUniqueRecipe(id) {
    return fetch("http://localhost:3438/recipe/" + id)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => {
            return err
        })
}

export async function updateNumberEyes(id) {
    const lastTimeCalled = localStorage.getItem("lastTimeCalledFunctionNumberEyes")
    const canExecuteFetch = lastTimeCalled ? new Date().getMinutes() > (Number(lastTimeCalled) + 5) : true;

    if(canExecuteFetch){
        localStorage.setItem("lastTimeCalledFunctionNumberEyes", new Date().getMinutes())
        const data = await axios.patch("http://localhost:3438/recipe/" + id).catch(err => {
            return err
        });
        return data
    }
}