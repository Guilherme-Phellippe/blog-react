import axios from "axios"
import moment from "moment"

const api = axios.create({
    baseURL: 'https://api.temsabor.blog/'
})

export const useRecipeApi = () => ({
    getAllRecipes: async () => {
        console.error("getAllRecipes")
        const response = await api.get('/recipes').catch(err => err)
        return response
    },

    createNewRecipe: async (recipe) => {
        console.error("createNewRecipe")
        const data = await api.post('/recipe', recipe).catch(error => error)

        return data.data
    },

    hostImages: async (imageForm) => {
        console.error("hostImages")
        const images = await api.post('/upload-images', imageForm);

        return images
    },

    getUniqueRecipe: async (id) => {
        console.error("getUniqueRecipe")
        const data = await api.get(`/recipe/${id}`).catch(err => err);
        return data
    },

    getRecipesByCategory: async (id) => {
        console.error("getRecipesByCategory")
        const response = await api.get(`/recipes/${id}/category`).catch(err => err)
        return response
    },

    updateRecipe: async (recipe) => {
        console.error("updateRecipe")
        const data = await api.put(`/recipe/${recipe.id}`, recipe)

        return data
    },

    updateVotesRecipe: async (ids) => {
        console.error("updateVotesRecipe")
        const data = await api.patch(`/recipe/${ids.userId}/votes/${ids.recipeId}`).catch(err => {
            return err
        });

        return data
    },
    verifyExistVote: async (id) => {
        console.error("verifyExistVote")
        const data = await api.get(`/recipe/${id}/already-voted`).catch(err => {
            return err
        });

        return data
    },

    deleteRecipe: async (id) => {
        console.error("deleteRecipe")
        const data = await api.delete(`/recipe/${id}`)

        return data
    }
});

export const useTipApi = () => ({
    getAllTips: async () => {
        console.error("getAllTips")
        const response = await api.get('/tips').catch(err => err)
        return response
    },

    createNewTip: async (tip) => {
        console.error("createNewTip")
        const data = await api.post('/tip', tip).catch(error => error)

        return data.data
    },

    getUniqueTip: async (id) => {
        console.error("getUniqueTip")
        const data = await api.get(`/tip/${id}`).catch(err => err);
        return data
    },


    updateTip: async (tip) => {
        console.error("updateTip")
        const data = await api.put(`/tip/${tip.id}`, tip)

        return data
    },

    deleteTips: async (id) => {
        console.error("deleteTips")
        const data = await api.delete(`/tip/${id}`)

        return data
    }
});


export const useFeedApi = () => ({
    getAllFeed: async () => {
        console.error("getAllFeed")
        const response = await api.get('/feeds').catch(err => err)
        return response
    },


    getUniqueFeed: async (id) => {
        console.error("getUniqueFeed")
        const data = await api.get(`/feed/${id}`).catch(err => err);
        return data
    },

    updateNumberEyes: async (id) => {
        console.error("updateNumberEyes")
        const TIME_NOW = `${moment().year()}${moment().dayOfYear()}${moment().hours()}${moment().minutes()}`;
        const lastTimeCalled = localStorage.getItem("lastTimeCalledFunctionNumberEyes")
        const canExecuteFetch = lastTimeCalled ? Number(TIME_NOW) > Number(lastTimeCalled) : true;
        if (canExecuteFetch) {
            localStorage.setItem("lastTimeCalledFunctionNumberEyes", TIME_NOW)
            const data = await api.patch(`/feed/${id}/nmr-eyes`).catch(err => {
                return err
            });
            return data
        }
    },

    updateNumberHearts: async (ids) => {
        console.error("updateNumberHearts")
        const data = await api.patch(`/feed/${ids.idUser}/nmr-hearts/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },
    updateNumberSaved: async (ids) => {
        console.error("updateNumberSaved")
        const data = await api.patch(`/feed/${ids.idUser}/nmr-saved/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },
})


export const useUserApi = () => ({

    authenticateUser: async (user_login) => {
        console.error("authenticateUser")
        const token = await api.post('/authenticate', user_login).catch(error => error)

        return token
    },

    authenticateLogin: async () => {
        console.error("authenticateLogin")
        const infoToken = JSON.parse(localStorage.getItem('token'))

        if (infoToken) {
            if (!infoToken.token) throw new Error("token is missing")
            if (!infoToken.id) throw new Error("Id is missing")

            const user = await api.get(`/authenticate-login/${infoToken.id}`, {
                headers: {
                    Authorization: `Bearer ${infoToken.token}`
                }
            }).catch(error => error)
            return user
        }

        return null
    },

    createNewUser: async (user) => {
        console.error("createNewUser")
        const { data } = await api.post('/users', user);
        return data
    },

    updateUser: async (user) => {
        console.error("updateUser")
        const response = await api.put(`/users/${user.id}`, user);
        return response
    },

    updatePassword: async (boxPassword) => {
        console.error("updatePassword")
        const response = await api.patch(`/users/${boxPassword.id}/change-password`, boxPassword)

        return response;
    },

    updateNumberSaved: async (ids) => {
        console.error("updateNumberSaved")
        const data = await api.patch(`/user/${ids.idUser}/nmr-saved/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },

    deleteUser: async (id) => {
        console.error("deleteUser")
        const response = await api.delete(`/users/${id}`);

        return response
    }

});

export const useCategoryApi = () => ({

    getAllCategory: async () => {
        console.error("getAllCategory")
        const categories = await api.get('/categories').catch(error => error)

        return categories
    },

    createNewCategory: async (name_category) => {
        console.error("createNewCategory")
        const category = await api.post(`/category`, { name_category }).catch(error => error)

        return category
    }

})

export const useCommentApi = () => ({

    createNewComment: async (comment) => {
        console.error("createNewComment")
        const commentData = await api.post('/comment', comment).catch(error => error);

        return commentData;
    },

    createNewAnswer: async (answer) => {
        console.error("createNewAnswer")
        const answerData = await api.post(`/comment/${answer.commentId}/answer`, answer).catch(error => error);

        return answerData;
    },

    deleteComment: async ({ commentId, userId }) => {
        console.error("deleteComment")
        const deleteData = await api.delete(`/comment/${commentId}/user/${userId}`).catch(error => error)

        return deleteData
    },

    deleteAnswer: async ({ commentId, userId, answerId }) => {
        console.error("deleteAnswer")
        const deleteData = await api.delete(`/comment/${commentId}/answer/${answerId}/user/${userId}`).catch(error => error)

        return deleteData
    },
});

export const useNotificationApi = () => ({

    updateReadNotification: async (notificationId, userId) => {
        console.error("updateReadNotification")
        const response = await api.patch(`/notification/${userId}/update-read/${notificationId}`);

        return response
    },

    newNotificationAlreadyExist: async (notificationId, userId) => {
        console.error("newNotificationAlreadyExist")
        const response = await api.post(`/notification/${userId}/new/${notificationId}`);

        return response
    },

    deleteNotification: async (notificationId, userId) =>{
        const response = await api.delete(`/notification/${userId}/delete/${notificationId}`);

        return response
    }
})