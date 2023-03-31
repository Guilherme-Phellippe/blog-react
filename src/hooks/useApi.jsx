import axios from "axios"
import moment from "moment"

const api = axios.create({
    baseURL: 'https://api.temsabor.blog/'
})

export const useRecipeApi = () => ({
    getAllRecipes: async () => {
        const response = await api.get('/recipes').catch(err => err)
        return response
    },

    createNewRecipe: async (recipe) => {
        const data = await api.post('/recipe', recipe).catch(error => error)

        return data.data
    },

    hostImages: async (imageForm) => {
        const images = await api.post('/upload-images', imageForm);

        return images
    },

    getUniqueRecipe: async (id) => {
        const data = await api.get(`/recipe/${id}`).catch(err => err);
        return data
    },

    getRecipesByCategory: async (id) => {
        const response = await api.get(`/recipes/${id}/category`).catch(err => err)
        return response
    },

    updateNumberEyes: async (id) => {
        const TIME_NOW = `${moment().year()}${moment().dayOfYear()}${moment().hours()}${moment().minutes()}`;
        const lastTimeCalled = localStorage.getItem("lastTimeCalledFunctionNumberEyes")
        const canExecuteFetch = lastTimeCalled ? Number(TIME_NOW) > (Number(lastTimeCalled) + 5) : true;
        if (canExecuteFetch) {
            localStorage.setItem("lastTimeCalledFunctionNumberEyes", TIME_NOW)
            const data = await api.patch(`/recipe/${id}/nmr-eyes`).catch(err => {
                return err
            });
            return data
        }
    },

    updateNumberHearts: async (ids) => {
        const data = await api.patch(`/recipe/${ids.idUser}/nmr-hearts/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },
    updateNumberSaved: async (ids) => {
        const data = await api.patch(`/recipe/${ids.idUser}/nmr-saved/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },
    updateVotesRecipe: async (ids) => {
        const data = await api.patch(`/recipe/${ids.idUser}/votes/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },
    verifyExistVote: async (id) => {
        const data = await api.get(`/recipe/${id}/already-voted`).catch(err => {
            return err
        });

        return data
    },

    updateRecipe: async (recipe) => {
        const data = await api.put(`/recipe/${recipe.id}`, recipe)

        return data
    },

    deleteRecipe: async (id) => {
        const data = await api.delete(`/recipe/${id}`)

        return data
    }



})


export const useUserApi = () => ({

    authenticateUser: async (user_login) => {
        const token = await api.post('/authenticate', user_login).catch(error => error)

        return token
    },

    authenticateLogin: async () => {
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
        const { data } = await api.post('/users', user);
        return data
    },

    updateUser: async (user) => {
        const response = await api.put(`/users/${user.id}`, user);
        return response
    },

    updatePassword: async (boxPassword) => {
        const response = await api.patch(`/users/${boxPassword.id}/change-password`, boxPassword)

        return response;
    },

    updateNumberSaved: async (ids) => {
        const data = await api.patch(`/user/${ids.idUser}/nmr-saved/${ids.idRecipe}`).catch(err => {
            return err
        });

        return data
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/users/${id}`);

        return response
    }

});

export const useCategoryApi = () => ({

    getAllCategory: async () => {
        const categories = await api.get('/categories').catch(error => error)

        return categories
    },

    createNewCategory: async (name_category) => {
        const category = await api.post(`/category`, { name_category }).catch(error => error)

        return category
    }

})

export const useCommentApi = () => ({

    createNewComment: async (comment) => {
        const commentData = await api.post('/comment', comment).catch(error => error);

        return commentData;
    },

    createNewAnswer: async (answer) => {
        const answerData = await api.post(`/comment/${answer.commentId}/answer`, answer).catch(error => error);

        return answerData;
    },

    deleteComment: async ({ commentId, userId }) => {
        const deleteData = await api.delete(`/comment/${commentId}/user/${userId}`).catch(error => error)

        return deleteData
    },

    deleteAnswer: async ({ commentId, userId, answerId }) => {
        const deleteData = await api.delete(`/comment/${commentId}/answer/${answerId}/user/${userId}`).catch(error => error)

        return deleteData
    },
});

export const useNotificationApi = () => ({

    updateReadNotification: async (notificationId, userId) => {
        const response = await api.patch(`/notification/${userId}/update-read/${notificationId}`);

        return response
    },

    newNotificationAlreadyExist: async (notificationId, userId) => {
        const response = await api.post(`/notification/${userId}/new/${notificationId}`);

        return response
    },
})