import { apiInstanceExpress } from "./apiInstance"

export const getUserAddress = async ({ token }) => {
    try {
        const address = await apiInstanceExpress.get('/address', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return address.data.data
    } catch (error) {
        console.log(error)
    }
}