export const smartSearch = (array, searchValue) => {
    if (!!array.length && searchValue.length >= 3) {
        const smartArray = []
        const filteredArray = array.filter(recipe => recipe.name_recipe && recipe)

        const wordToRemove = ["receitas", "receita", "ingredientes", "como", "fazer", "com", "a", "o", "e", "de", "da", "do"]

        const wordSearchClear = searchValue
            .split(" ")
            .reverse()
            .filter(word => !wordToRemove.find(wordRemove => wordRemove.toLowerCase() === word.toLowerCase()) && word !== '')

        if (!!wordSearchClear.length) {
            const foundNameRecipe = filteredArray.filter(recipe =>
                wordSearchClear.find(word =>
                    recipe.name_recipe.toLowerCase().includes(word.toLowerCase())
                ));


            const foundNameCategory = filteredArray.find(recipe =>
                wordSearchClear.find(word => {
                    if (!!foundNameRecipe.length) {
                        return !foundNameRecipe.find(found => found.name_recipe.includes(recipe.name_recipe)) && recipe.category.name_category.toLowerCase().includes(word.toLowerCase())
                    } else {
                        return recipe.category.name_category.toLowerCase().includes(word.toLowerCase())
                    }
                }));


            foundNameRecipe && smartArray.push(...foundNameRecipe)
            foundNameCategory && smartArray.push(foundNameCategory)
        }

        //TERMINAR DE DEIXAR INTELINGETE A BUSCA, FALTA ADICIONAR WORD KEY, INGREDIENTES E NOME DO usuario

        return smartArray
    } else return []
}