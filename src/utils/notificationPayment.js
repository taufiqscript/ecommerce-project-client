import { apiInstanceExpress } from "./apiInstance"

export const notificationPayment = async (
    {
        order_id,
        transaction_status,
        payment_type,
        transaction_id,
        token
    }
) => {
    try {
        const notification = apiInstanceExpress.post('/payment/notification', {
            order_id,
            transaction_status,
            payment_type,
            transaction_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return notification
    } catch (error) {
        console.log(error)
    }
}