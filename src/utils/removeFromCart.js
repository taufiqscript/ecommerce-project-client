import { apiInstanceExpress } from "./apiInstance"

export const removeFromCart = async ({ cartId, token, setNotifMessage, setIsAdded, setRefresh }) => {
    try {
        const removing = await apiInstanceExpress.delete('/cart', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                cartId
            }
        })

        if (removing.status !== 200) return setNotifMessage('Gagal menghapus item!')

        setNotifMessage('Item berhasil dihapus')
        setIsAdded(false)
        setRefresh(prev => !prev)
        setTimeout(() => {
            setNotifMessage(null)
        }, 2000)

    } catch (error) {
        console.log(error.response?.data?.message)
    }
}