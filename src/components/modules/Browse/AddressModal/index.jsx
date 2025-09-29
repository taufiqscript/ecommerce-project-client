import { LIST_REGION } from '@/constans/listRegion'
import { formAtom, isClickedAtom, isOpenModalAtom, languageStorageAtom, tokenStorageAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import Notify from '../../Notify'
import { setPrimaryAddress } from '@/utils/setPrimaryAddress'
import { updateUserAddress } from '@/utils/updateUserAddress'

const AddressModal = () => {
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [languageStorage] = useAtom(languageStorageAtom)

    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [form, setForm] = useAtom(formAtom)
    const [isClicked] = useAtom(isClickedAtom)

    const [clicked1, setClicked1] = useState(false)
    const [clicked2, setClicked2] = useState(false)

    const [activeTab, setActiveTab] = useState('province')
    const [selectedProvince, setSelectedProvince] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [notifMessage, setNotifMessage] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        try {
            const add = await apiInstanceExpress.post('/address', form, {
                headers: {
                    Authorization: `Bearer ${tokenStorage}`
                }
            })

            if (add.status !== 201) return setNotifMessage('Gagal menambahkan alamat!')

            setNotifMessage('Berhasil menambahkan alamat')
        } catch (error) {
            console.log(error.response?.data?.message)
            setNotifMessage(error.response?.data?.message)
        }
    }

    return (
        <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
            {notifMessage && <Notify message={notifMessage} style={"toast-middle"}
                styleMessage={"bg-black/50 flex flex-col text-2xl p-6"} onClose={() => {
                    setNotifMessage(null)
                    location.reload()
                }} />}
            <div className='bg-white py-4 px-6 rounded-sm'>
                <h2 className='text-xl pb-5'>
                    {languageStorage === 'en' ? 'New Address' : 'Alamat Baru'}
                </h2>
                <div className='relative flex flex-col gap-6'>
                    <div className='flex items-center gap-4'>
                        <input
                            name='fullName'
                            onChange={handleChange}
                            value={form.fullName}
                            placeholder={languageStorage === 'en' ? 'Full Name' : 'Nama Lengkap'}
                            className='border border-gray-200 p-2 shadow-sm w-full'
                        />
                        <input
                            name='phone'
                            onChange={handleChange}
                            value={form.phone}
                            placeholder={languageStorage === 'en' ? 'Phone Number' : 'Nomor Telepon'}
                            className='border border-gray-200 p-2 shadow-sm w-full'
                        />
                    </div>
                    <div className='flex flex-col gap-6'>
                        <div className="dropdown">
                            <input
                                tabIndex={0}
                                readOnly
                                value={[form.province, form.city, form.district, form.postalCode].filter(Boolean).join(", ")}
                                placeholder={languageStorage === 'en' ? 'Province, City, District, Postal Code' : 'Provinsi, Kota, Kecamatan, Kode Pos'}
                                className='border border-gray-200 p-2 shadow-sm w-full'
                            />
                            <ul
                                tabIndex={0}
                                className='dropdown-content bg-white h-[230px] w-full border border-gray-200 shadow-sm'>
                                <div className='flex justify-between items-center px-4 text-sm border-b-gray-300 border-b-1 h-14'>
                                    <button
                                        className={`w-auto py-4 ${activeTab === "province" && "border-b-4 border-blue-500"} cursor-pointer transition-all`}
                                        onClick={() => setActiveTab("province")}
                                    >
                                        Province
                                    </button>
                                    <button
                                        className={`w-auto py-4 ${activeTab === "city" && "border-b-4 border-blue-500"} cursor-pointer transition-all`}
                                        disabled={!selectedProvince}
                                        onClick={() => setActiveTab("city")}
                                    >
                                        Kota
                                    </button>
                                    <button
                                        className={`w-auto py-4 ${activeTab === "district" && "border-b-4 border-blue-500"} cursor-pointer transition-all`}
                                        disabled={!selectedCity}
                                        onClick={() => setActiveTab("district")}
                                    >
                                        Kecamatan
                                    </button>
                                    <button
                                        className={`w-auto py-4 ${activeTab === "postalCode" && "border-b-4 border-blue-500"} cursor-pointer transition-all`}
                                        disabled={!form.district}
                                        onClick={() => setActiveTab("postalCode")}
                                    >
                                        Kode Pos
                                    </button>
                                </div>
                                <div className='flex flex-col h-[180px] overflow-y-auto'>
                                    {activeTab === "province" &&
                                        <EachUtils
                                            of={LIST_REGION}
                                            render={(item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedProvince(item)
                                                        setForm(prev => ({
                                                            ...prev,
                                                            province: item.name,
                                                            city: "",
                                                            district: "",
                                                            postalCode: ""
                                                        }))
                                                        setActiveTab('city')
                                                    }}
                                                    className='cursor-pointer px-2 py-3 hover:bg-gray-100'>
                                                    {item?.name}
                                                </li>
                                            )}
                                        />
                                    }
                                    {activeTab === "city" &&
                                        <EachUtils
                                            of={selectedProvince?.cities}
                                            render={(item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setSelectedCity(item)
                                                        setForm(prev => ({
                                                            ...prev,
                                                            city: item.name,
                                                            district: "",
                                                            postalCode: ""
                                                        }))
                                                        setActiveTab('district')
                                                    }}
                                                    className='cursor-pointer px-2 py-3 hover:bg-gray-100'
                                                >
                                                    {item.name}
                                                </li>
                                            )}
                                        />
                                    }
                                    {activeTab === "district" &&
                                        <EachUtils
                                            of={selectedCity?.districts}
                                            render={(item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        setForm(prev => ({
                                                            ...prev,
                                                            district: item.name,
                                                            postalCode: item.postalCode
                                                        }))
                                                        setActiveTab('postalCode')
                                                    }}
                                                    className='cursor-pointer px-2 py-3 hover:bg-gray-100'
                                                >
                                                    {item.name}
                                                </li>
                                            )}
                                        />
                                    }
                                    {activeTab === "postalCode" &&
                                        <li
                                            onClick={() => {
                                                setActiveTab('province')
                                                document.activeElement.blur()
                                            }}
                                            className='cursor-pointer px-2 py-3 hover:bg-gray-100'
                                        >
                                            {form.postalCode}
                                        </li>
                                    }
                                </div>
                            </ul>
                        </div>
                        <input
                            name='street'
                            onChange={handleChange}
                            value={form.street}
                            placeholder={languageStorage === 'en' ? 'Street Name, Building, House Number' : 'Nama Jalan, Gedung, No. Rumah'}
                            className='border border-gray-200 p-2 shadow-sm w-full'
                        />
                        <input
                            name='detail'
                            onChange={handleChange}
                            value={form.detail}
                            placeholder={languageStorage === 'en' ? 'Other Details (Example: Block / Unit No., Brenchmark)' : 'Detail Lainnya (Cth: Blok / Unit No., Patokan)'}
                            className='border border-gray-200 p-2 shadow-sm w-full'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        {languageStorage === 'en' ? 'Mark As:' : 'Tandai Sebagai:'}
                        <div className='flex items-center gap-3'>
                            <button
                                value={form.label}
                                onClick={() => {
                                    setForm({ ...form, label: "Rumah" })
                                    setClicked1(!clicked1)
                                    setClicked2(false)
                                }}
                                className={`border shadow-xs py-1 px-2 cursor-pointer transition-all ${clicked1 || form.label === "Rumah" ? "text-blue-500 border-blue-500" : "text-black border-gray-200"}`}
                            >
                                {languageStorage === 'en' ? 'House' : 'Rumah'}
                            </button>
                            <button
                                value={form.label}
                                onClick={() => {
                                    setForm({ ...form, label: "Kantor" })
                                    setClicked2(!clicked2)
                                    setClicked1(false)
                                }}
                                className={`border shadow-xs py-1 px-2 cursor-pointer transition-all ${clicked2 || form.label === "Kantor" ? "text-blue-500 border-blue-500" : "text-black border-gray-200"}`}
                            >
                                {languageStorage === 'en' ? 'Office' : 'Kantor'}
                            </button>
                        </div>
                        <div className='flex items-center gap-2 pt-2'>
                            <div
                                className={`${form.isPrimary ? "dropdown dropdown-top dropdown-hover" : ""}`}>
                                <input
                                    tabIndex={0}
                                    type='checkbox'
                                    checked={form.isPrimary}
                                    onChange={(e) => setForm(prev => ({ ...prev, isPrimary: e.target.checked }))}
                                    disabled={form.isPrimary}
                                    placeholder='Atur sebagai Alamat Utama'
                                    className='checkbox checked:text-white checked:bg-blue-500'
                                />
                                {form.isPrimary && (
                                    <div className='dropdown-content w-50 bg-white border border-gray-200 rounded-xl h-28 text-sm p-1 text-center flex items-center'>
                                        <p>
                                            Alamat utama tidak dapat dihapus. Anda dapat mengatur alamat yang lainnya sebagai alamat utama
                                        </p>
                                    </div>
                                )}
                            </div>
                            <p className='text-sm'>
                                {languageStorage === 'en' ? 'Set as Primary Address' : 'Atur sebagai alamat utama'}
                            </p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div />
                        <div className='flex gap-6'>

                            <button
                                onClick={() => {
                                    setIsOpenModal(false)
                                    location.reload()
                                }}
                                className='hover:bg-gray-100/50 px-4 py-2 rounded-sm text-black cursor-pointer w-32'>
                                {languageStorage === 'en' ? 'Later' : 'Nanti Saja'}
                            </button>
                            <button
                                onClick={() => isClicked === true ? updateUserAddress({
                                    token: tokenStorage,
                                    data: {
                                        addressId: form.id,
                                        ...form
                                    },
                                    setNotifMessage
                                }) && setPrimaryAddress({
                                    addressId: form.id,
                                    token: tokenStorage
                                }) && setForm(prev => ({ ...prev, isPrimary: e.target.checked }))
                                    :
                                    handleSubmit()
                                }
                                className='bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-sm text-white cursor-pointer w-32 font-semibold'
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog >
    )
}

export default AddressModal