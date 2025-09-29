import { apiInstanceExpress } from "./apiInstance"

export const addToShoppingCart = async ({ data, token, setNotifMessage, setIsAdded, setRefresh }) => {
    try {
        const addToCart = await apiInstanceExpress.post('/cart', { data }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (addToCart.status !== 201) return setNotifMessage('Gagal menambahkan item!')

        setNotifMessage('Berhasil menambahkan item ke keranjang')
        setIsAdded(true)
        setRefresh(prev => !prev)
        setTimeout(() => {
            setNotifMessage(null)
        }, 2000)

    } catch (error) {
        console.log(error.response?.data?.message)
    }
}