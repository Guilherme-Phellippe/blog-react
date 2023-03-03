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
    return fetch("http://localhost:3438/recipe/"+id)
        .then(res => res.json())
        .then(data => {
            return data
        })
        .catch(err => {
            return err
        })
}