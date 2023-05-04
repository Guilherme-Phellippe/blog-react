export const smartSearch = (array, searchValue) => {
    const smartArray = []

    if (!!array.length && searchValue.length >= 3) {
        const filteredArray = array.filter(recipe => recipe.name_recipe && recipe)

        const wordToRemove = ["receitas", "receita", "ingredientes", "como", "fazer", "com", "a", "o", "e", "de", "da", "do"]

        const wordSearchClear = searchValue
            .split(" ")
            .filter(word => !wordToRemove.find(wordRemove => wordRemove.toLowerCase() === word.toLowerCase()) && word !== '')
            .sort((a, b) => b.length - a.length)

        if (searchValue) {
            //SEARCH BY COMPLETE SEARCH TEXT
            const foundNameRecipeComplete = filteredArray.find(recipe => recipe.name_recipe.toLowerCase().includes(searchValue))


            //MAKE A FILTER WITH ALL RECIPES WITH WORD KEYS IN SEARCH TEXT
            const foundFilterRecipes = filteredArray.filter(recipe =>
                wordSearchClear.find(word => recipe.name_recipe.toLowerCase().includes(word.toLowerCase()))
            );

            //SEARCH BY NAME CATEGORY
            const foundFilterNameCategory = filteredArray.filter(recipe =>
                wordSearchClear.find(word => recipe.category.name_category.toLowerCase().includes(word.toLowerCase()))
            );

            //SEARCH BY LIST INGREDIENTS
            const foundFilterByIngredients = filteredArray.filter(recipe =>
                wordSearchClear.find(word => recipe.ing.find(i => i.toLowerCase().includes(word.toLowerCase())))
            );

            //SEARCH BY WORD KEYS
            const foundFilterByWordKey = filteredArray.filter(recipe =>
                wordSearchClear.find(word => recipe.word_key.find(key => key.toLowerCase().includes(word.toLowerCase())))
            );

            //SEARCH BY NAME USER
            const foundFilterByUser = filteredArray.filter(recipe =>
                wordSearchClear.find(word => recipe.user.name.toLowerCase().includes(word.toLowerCase()))
            );

            foundNameRecipeComplete && smartArray.push(foundNameRecipeComplete)
            foundFilterRecipes && smartArray.push(...foundFilterRecipes)
            foundFilterNameCategory && smartArray.push(...foundFilterNameCategory)
            foundFilterByIngredients && smartArray.push(...foundFilterByIngredients)
            foundFilterByWordKey && smartArray.push(...foundFilterByWordKey)
            foundFilterByUser && smartArray.push(...foundFilterByUser)
        }
    }

    const arrayRemoveDuplicate = smartArray.filter((obj, index, array) => { return index === array.findIndex(item => item.id === obj.id) })

    return arrayRemoveDuplicate
}