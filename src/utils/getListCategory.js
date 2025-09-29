import { apiInstance } from "./apiInstance"

export const getListCategory = async ({ products }) => {
    try {
        const list = await apiInstance.get(`${products}`)
        return list.data
    } catch (error) {
        console.log(error)
    }
}