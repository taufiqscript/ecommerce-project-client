import { apiInstance } from "./apiInstance"

export const getProductDetail = async ({ idProd }) => {
    try {
        let produk = await apiInstance.get(`products/${idProd}`)
        return produk.data
    } catch (error) {
        console.log(error)
    }
}