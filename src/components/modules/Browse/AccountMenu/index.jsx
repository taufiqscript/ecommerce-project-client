import { choosedBankStorageAtom, emailstorageAtom, languageStorageAtom, methodPaymentStorageAtom, tokenStorageAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Notify from '../../Notify'

const AccountMenu = () => {
    const navigate = useNavigate()

    const [languageStorage] = useAtom(languageStorageAtom)
    const [emailStorage, setEmailStorage] = useAtom(emailstorageAtom)
    const [tokenStorage, setTokenStorage] = useAtom(tokenStorageAtom)
    const [, setMethodPayment] = useAtom(methodPaymentStorageAtom)
    const [, setBankStorage] = useAtom(choosedBankStorageAtom)

    const [notifMessage, setNotifMessage] = useState(null)

    const handleSignOut = async () => {
        try {
            const logout = await apiInstanceExpress.delete('/sign-out', {
                headers: {
                    Authorization: `Bearer ${tokenStorage}`
                }
            })

            if (logout.status !== 200) return setNotifMessage('Gagal Sign Out!')

            setEmailStorage(null)
            setTokenStorage(null)
            setMethodPayment(null)
            setBankStorage(null)

            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='dropdown dropdown-hover dropdown-end'>
            {notifMessage && <Notify message={notifMessage} />}
            <div tabIndex={0} className="avatar avatar-online">
                <div className="w-4 sm:w-8 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
            <div
                tabIndex={0}
                className='dropdown-content flex flex-col gap-1 justify-center bg-white rounded p-1 sm:p-2 text-black shadow-lg'>
                <p className='text-[8px] sm:text-sm'>{emailStorage}</p>
                <div
                    onClick={handleSignOut}
                    className='flex items-center gap-0.5 sm:gap-1 justify-center hover:text-red-500 cursor-pointer'
                >
                    <FaSignOutAlt className='text-[8px] sm:text-[16px]' />
                    <div className='hover:underline text-[8px] sm:text-sm'>
                        {languageStorage === 'en' ? 'Sign Out' : 'Keluar'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu