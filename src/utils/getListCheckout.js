import { apiInstanceExpress } from "./apiInstance"

export const getListCheckOut = async ({ email, token }) => {
    const url = `${email}/${token}`
    try {
        const checkout = await apiInstanceExpress.get(`/checkout/${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return checkout.data.data
    } catch (error) {
        console.log(error)
    }
}