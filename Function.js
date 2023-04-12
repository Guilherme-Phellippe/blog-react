const handleNextButton = async (e) => {
    e.preventDefault()
    if (e.currentTarget.id === "next") {
        const ingredients = Array.from(refTwoStep.current.querySelectorAll('ul#ing li p')).map(p => p.textContent)
        const ingredientsNewList = Array.from(refTwoStep.current.querySelectorAll('ul#new-ing li p')).map(p => p.textContent)
        const wordKey = Array.from(refThreeStep.current.querySelectorAll('ul#word-keys li p')).map(p => p.textContent)


        if (step === 1) {
            const category = refOneStep.current.querySelector('div input#category').value;
            const formatCategoryUpperCase = category.charAt(0).toUpperCase() + category.slice(1)
            const response = await categoryApiRef.current.createNewCategory(formatCategoryUpperCase);

            if (response.data) {
                var categoriesData = { data: null }
                if (response.status === 201) categoriesData = await categoryApiRef.current.getAllCategory();
                const { data } = categoriesData;
                const categoriesList = data || categories
                modelRecipe.categoryId = categoriesList.find(cate => cate.name_category.toLowerCase().includes(category.toLowerCase())).id;
                modelRecipe.userId = user.id;
                modelRecipe.name_recipe = refOneStep.current.querySelector('div input#name_recipe').value;
                modelRecipe.time = Number(refOneStep.current.querySelector('div input#time').value);
                modelRecipe.portion = Number(refOneStep.current.querySelector('div input#portion').value);

                if (modelRecipe.categoryId && modelRecipe.userId && modelRecipe.name_recipe && modelRecipe.time && modelRecipe.portion) {
                    localStorage.setItem("recipe", JSON.stringify(modelRecipe));
                    setStep(2)
                } else {
                    // setModalMenssage("Preencha todos os campos")
                    // setModalSuccessOpen(true)
                }
            }
        }
        else if (step === 2) {
            modelRecipe.ing = ingredients;
            modelRecipe.stuffing_ing = ingredientsNewList;
            modelRecipe.prepareMode = refTwoStep.current.querySelector('input#prepare-mode').value;


            if (!!modelRecipe.ing.length && modelRecipe.prepareMode) {
                localStorage.setItem("recipe", JSON.stringify(modelRecipe))
                setStep(3)
            } else {
                // setModalMenssage("Preencha todos os campos")
                // setModalSuccessOpen(true)
            }
        } else if (step === 3) {
            modelRecipe.word_key = wordKey;
            modelRecipe.images_recipe = images;
            modelRecipe.videos_recipe = [];

            if (!!modelRecipe.word_key && !!images.length) {
                const data = await recipeApiRef.current.createNewRecipe(modelRecipe)
                if (data) {
                    // setModalSuccessOpen(true)
                    // setModalMenssage("Receita criada com sucesso")
                    navigate('/')
                }
            } else {
                // setModalMenssage("Preencha todos os campos")
                // setModalSuccessOpen(true)
            }
        }
    }
}
