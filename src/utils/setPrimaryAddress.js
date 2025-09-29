import { apiInstanceExpress } from "./apiInstance"

export const setPrimaryAddress = async ({ addressId, token }) => {
    try {
        const addr = await apiInstanceExpress.put('/address/setPrimary', { addressId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return addr
    } catch (error) {
        console.log(error)
    }
}