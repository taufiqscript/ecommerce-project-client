import { apiInstanceExpress } from "./apiInstance"

export const addToCheckout = async ({ data, token, setNotifMessage }) => {
    try {
        const checkout = await apiInstanceExpress.post('/checkout', { data }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (checkout.status !== 201) return setNotifMessage('Gagal menambahkan produk!')
        setTimeout(() => location.replace('/checkout'), 1000)
    } catch (error) {
        console.log(error)
    }
}