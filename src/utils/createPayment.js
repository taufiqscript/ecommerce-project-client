import { apiInstanceExpress } from "./apiInstance"

export const createPayment = async ({ userId, amount, customerName, email, setNotifMessage, token }) => {
    try {
        const response = await apiInstanceExpress.post('/payment/create', {
            userId,
            amount,
            customerName,
            email
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const data = response.data

        if (!response.status || response.status !== 200) return setNotifMessage(data.message || 'Gagal membuat pembayaran!')

        return data.data
    } catch (error) {
        console.error('Error createPayment:', error)
        return setNotifMessage(error)
    }
}