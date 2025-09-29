import { apiInstanceExpress } from "./apiInstance"

export const removeUserAddress = async ({ addressId, token, setNotifMessage }) => {
    try {
        const remove = await apiInstanceExpress.delete(`/address`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                addressId
            }
        })

        if (remove.status !== 200) return setNotifMessage('Gagal mengapus alamat!')

        setNotifMessage('Berhasil menghapus alamat')
        setTimeout(() => location.reload(), 2000)

        return remove
    } catch (error) {
        console.log(error)
    }
}