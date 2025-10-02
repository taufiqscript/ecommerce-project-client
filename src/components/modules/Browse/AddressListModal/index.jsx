import { chosedAddressStorageAtom, emailstorageAtom, formAtom, isClickedAtom, isOpenModalAddressAtom, isOpenModalAtom, languageStorageAtom, tokenStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { getUserAddress } from '@/utils/getUserAddress'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { GoPlus, GoTrash } from 'react-icons/go'
import AddressModal from '../AddressModal'
import { removeUserAddress } from '@/utils/removeUserAddress'
import Notify from '../../Notify'

const AddressListModal = () => {

    const [languageStorage] = useAtom(languageStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [emailStorage] = useAtom(emailstorageAtom)
    const [chosedAddressStorage, setChosedAddressStorage] = useAtom(chosedAddressStorageAtom)

    const [isOpenModalAddress, setIsOpenModalAddress] = useAtom(isOpenModalAddressAtom)
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [, setIsClicked] = useAtom(isClickedAtom)
    const [, setForm] = useAtom(formAtom)

    const [address, setAddress] = useState([])
    const [notifMessage, setNotifMessage] = useState(null)
    const [selectAddress, setSelectAddress] = useState(null)

    useEffect(() => {
        const fetchMyAddress = async () => {
            try {
                if (isOpenModalAddress && tokenStorage && emailStorage) {
                    const getAddr = await getUserAddress({ token: tokenStorage })
                    setAddress(getAddr)

                    const isPrimary = await getAddr.find(addr => addr.isPrimary)
                    setSelectAddress(!chosedAddressStorage ? isPrimary._id : chosedAddressStorage)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchMyAddress()
    }, [isOpenModalAddress, tokenStorage, emailStorage])

    const handleSelectAddress = (id) => {
        setSelectAddress(id)
    }

    const mainAddr = address?.find(item => item.isPrimary === true)

    return (
        <dialog className={`modal ${isOpenModalAddress ? "modal-open" : ""}`}>
            {notifMessage && <Notify
                message={notifMessage}
                style={"toast-middle"}
                styleMessage={"bg-black/50 flex flex-col text-[14px] sm:text-2xl p-2 sm:p-6"}
                onClose={() =>
                    setNotifMessage(null)}
                isShowIcon={chosedAddressStorage === mainAddr?._id || mainAddr ? false : true}
            />}
            <div className='bg-white rounded-sm max-w-xs sm:max-w-lg w-full h-auto overflow-y-scroll'>
                <h2 className='text-[14px] sm:text-xl p-2 sm:p-4 font-semibold'>
                    {languageStorage === 'en' ? 'My Address' : 'Alamat Saya'}
                </h2>
                <div className='flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 border-y-gray-300 border-y-1 h-[300px] sm:h-[450px]'>
                    <EachUtils
                        of={address}
                        render={(item, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center ${index - 1 ? "border-b-gray-300 border-b-1" : "border-none"}`}
                            >
                                <div className='flex flex-col pb-1.5 sm:pb-3'>
                                    <div className='flex gap-1 sm:gap-2 items-center'>

                                        <input
                                            checked={selectAddress ? selectAddress === item._id
                                                :
                                                item.isPrimary
                                            }
                                            name='address'
                                            onChange={() => handleSelectAddress(item._id)}
                                            type='radio'
                                            className='radio radio-sm rounded-full checked:text-black checked:bg-white mr-1 sm:mr-2 w-[14px] h-[14px] sm:w-[22px] sm:h-[22px]'
                                            defaultChecked
                                        />
                                        <h3 className='text-[14px] sm:text-lg font-bold'>{item.fullName}</h3>
                                        <div className='text-[14px] sm:text-[16px]'>|</div>
                                        <p className='text-[14px] sm:text-[16px]'>{item.phone}</p>
                                    </div>
                                    <p
                                        className='text-[12px] sm:text-[16px] pl-5 sm:pl-9 max-w-[220px] sm:max-w-sm'
                                    >{item.street} ({item.detail}) {item.district}, {item.city}, {item.province}, {item.postalCode}
                                    </p>
                                    {item.isPrimary && (
                                        <p className='text-[5.5px] sm:text-[11px] text-center w-6.5 sm:w-12.5 font-bold border border-blue-500 text-blue-500 py-0.5 px-0.5 sm:px-1 ml-5 sm:ml-9'>
                                            {languageStorage === 'en' ? 'Default' : 'Utama'}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <p
                                        onClick={() => {
                                            setIsOpenModal(true)
                                            setForm(prev => (
                                                {
                                                    ...prev,
                                                    id: item._id,
                                                    fullName: item.fullName,
                                                    phone: item.phone,
                                                    province: item.province,
                                                    city: item.city,
                                                    street: item.street,
                                                    district: item.district,
                                                    detail: item.detail,
                                                    label: item.label,
                                                    postalCode: item.postalCode,
                                                    isPrimary: item.isPrimary
                                                }
                                            ))
                                            setIsClicked(true)
                                        }}
                                        className='text-[11px] sm:text-sm text-blue-400 cursor-pointer'>
                                        {languageStorage === 'en' ? 'Change' : 'Ubah'}
                                    </p>
                                </div>
                            </div>
                        )}
                    />
                    <div className='flex gap-2 sm:gap-4'>
                        <button
                            onClick={() => setIsOpenModal(true)}
                            className='flex items-center justify-center gap-0.5 sm:gap-1 border border-gray-300 p-1 sm:p-2 w-32 sm:w-50 hover:bg-gray-100 cursor-pointer text-[11px] sm:text-[16px]'>
                            <GoPlus className='text-[14px] sm:text-[28px]' />
                            {languageStorage === 'en' ? 'Add New Address' : 'Tambah Alamat Baru'}
                        </button>
                        {address?.length > 1 && (
                            <button
                                onClick={() => {
                                    selectAddress === mainAddr?._id ?
                                        setNotifMessage('Alamat utama tidak dapat dihapus!')
                                        :
                                        selectAddress &&
                                        removeUserAddress({
                                            addressId: selectAddress,
                                            token: tokenStorage,
                                            setNotifMessage
                                        })
                                }}
                                className='flex items-center justify-center gap-1 sm:gap-2 border border-gray-300 p-1 sm:p-2 w-24 sm:w-43 hover:bg-red-500 hover:text-white hover:border-none cursor-pointer text-[11px] sm:text-[16px]'
                            >
                                <GoTrash className='text-[11px] sm:text-[22px]' />
                                {languageStorage === 'en' ? 'Remove Address' : 'Hapus Alamat'}
                            </button>
                        )}

                    </div>
                </div>
                <div className='flex justify-between items-center p-2 sm:p-4'>
                    <div />
                    <div className='flex gap-2 sm:gap-4'>

                        <button
                            onClick={() => {
                                setIsOpenModalAddress(false)
                                setSelectAddress(chosedAddressStorage)
                                location.reload()
                            }}
                            className='border border-gray-100 w-18 text-[11px] sm:text-[16px] sm:w-35 py-1 sm:py-2 shadow-sm hover:bg-gray-100 cursor-pointer'>
                            {languageStorage === 'en' ? 'Cancel' : 'Batalkan'}
                        </button>
                        <button
                            onClick={() => {
                                setChosedAddressStorage(selectAddress)
                                location.reload()
                            }}
                            className='bg-indigo-500 text-white w-18 text-[11px] sm:text-[16px] sm:w-35 py-1 sm:py-2 shadow-md hover:bg-indigo-600 cursor-pointer'>
                            {languageStorage === 'en' ? 'Confirm' : 'Konfirmasi'}
                        </button>
                    </div>
                </div>
            </div>
            <AddressModal
                listAddress={address}
            />
        </dialog>
    )
}

export default AddressListModal