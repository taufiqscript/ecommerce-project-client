import { apiInstanceExpress } from "./apiInstance"

export const updateUserAddress = async ({ data, token, setNotifMessage }) => {
    try {
        const addr = await apiInstanceExpress.put('/address', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (addr.status !== 200) return setNotifMessage('Gagal mengupdate alamat!')

        setNotifMessage('Berhasil mengupdate alamat')
        return addr.data
    } catch (error) {
        console.log(error)
    }
}