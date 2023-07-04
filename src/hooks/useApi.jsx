import axios from "axios"
import moment from "moment"
import { promptModal } from "../modals/Prompt";

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

    updateRecipe: async (recipe) => {
        const data = await api.put(`/recipe/${recipe.id}`, recipe)

        return data
    },

    updateVotesRecipe: async (ids) => {
        const data = await api.patch(`/recipe/${ids.userId}/votes/${ids.recipeId}`).catch(err => {
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

    deleteRecipe: async (id) => {
        const data = await api.delete(`/recipe/${id}`)

        return data
    }
});

export const useTipApi = () => ({
    getAllTips: async () => {
        const response = await api.get('/tips').catch(err => err)
        return response
    },

    createNewTip: async (tip) => {
        const data = await api.post('/tip', tip).catch(error => error)

        return data.data
    },

    getUniqueTip: async (id) => {
        const data = await api.get(`/tip/${id}`).catch(err => err);
        return data
    },


    updateTip: async (tip) => {
        const data = await api.put(`/tip/${tip.id}`, tip)

        return data
    },

    deleteTips: async (id) => {
        const data = await api.delete(`/tip/${id}`)

        return data
    }
});

export const useFeedApi = () => ({
    getAllFeed: async () => {
        const response = await api.get('/feeds').catch(err => err)
        return response
    },

    getUniqueFeed: async (id) => {
        const data = await api.get(`/feed/${id}`).catch(err => err);
        return data
    },

    updateNumberEyes: async (id) => {
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
        const data = await api.patch(`/feed/${ids.idUser}/nmr-hearts/${ids.recipeId}`).catch(err => {
            return err
        });

        return data
    },
    updateNumberSaved: async (ids) => {
        const data = await api.patch(`/feed/${ids.idUser}/nmr-saved/${ids.recipeId}`).catch(err => {
            return err
        });

        return data
    },
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

    deleteNotification: async (notificationId, userId) => {
        const response = await api.delete(`/notification/${userId}/delete/${notificationId}`);

        return response
    }
})


export const useWhatsapp = () => ({
    sendRecipe: async (data) => {
        const description = await promptModal("Crie um texto persuasivo para essa receita...", true);
        const url = data?.images_recipe ? data.images_recipe[0].big : data.images[0].big;

        if (description) {
            const infoRecipe = {
                url,
                name: data.name_recipe || data.name_tip,
                description,
                link: `https://temsabor.blog/recipe/${(data.name_recipe || data.name_tip).replaceAll(" ", "%20")}/${data.id}`,
            }

            const response = await axios.post("https://whatsapp.temsabor.blog/send-recipe", infoRecipe)

            return response
        } else return null

    }
})

export const useShortLink = () => ({
    createShortLink: async (url) => {
        const link = await api.post("/create-short-link", url).catch((err) => {
            console.error("ERROR REQUEST SHORT LINK:", err)
            return false
        })

        return link
    }
})

export const useNotificationPush = () => ({
    getPublicKey: async () => {
        const response = await axios.get("http://localhost:3334/push/public_key").catch((err) => {
            console.error("ERROR REQUEST PUBLIC KEY:", err)
            return false
        })

        return response
    },
    registerUserWithSubscription: async (data) => {
        const response = await axios.post("http://localhost:3334/push/register", data).catch((err) => {
            console.error("ERROR REQUEST REGISTER:", err)
            return false
        })

        return response
    },
    sendNotification: async (data) => {
        const response = await axios.post("http://localhost:3334/push/send", data).catch((err) => {
            console.error("ERROR REQUEST SEND NOTIFICATION:", err)
            return false
        })

        return response
    }
})
