import { apiInstanceExpress } from "./apiInstance"

export const getMyShoppingCart = async ({ email, token }) => {
    try {
        const url = `${email}/${token}`
        const cart = await apiInstanceExpress.get(`/cart/${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return cart.data.data
    } catch (error) {
        console.log(error)
    }
}