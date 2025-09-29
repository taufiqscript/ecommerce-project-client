import { apiInstanceExpress } from "./apiInstance"

export const checkIsAdded = async ({ idProduct, token }) => {
    try {
        const isAdded = await apiInstanceExpress.post('/cart/check', {
            cartId: idProduct
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return isAdded.data.data.isAdded
    } catch (error) {
        console.log(error)
    }
}