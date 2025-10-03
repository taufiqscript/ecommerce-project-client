import BrowseLayout from '@/components/layouts/BrowseLayout'
import AccountMenu from '@/components/modules/Browse/AccountMenu'
import AddressListModal from '@/components/modules/Browse/AddressListModal'
import AddressModal from '@/components/modules/Browse/AddressModal'
import PrintStruk from '@/components/modules/Browse/PrintStruk'
import Footer from '@/components/modules/Landing/Footer'
import OptionLanguage from '@/components/modules/Landing/OptionLanguage'
import Notify from '@/components/modules/Notify'
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from '@/constans/listNavbar'
import { choosedBankStorageAtom, chosedAddressStorageAtom, emailstorageAtom, isOpenModalAddressAtom, isOpenModalAtom, languageStorageAtom, methodPaymentStorageAtom, printStrukModalAtom, refreshAtom, tokenStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { getListCheckOut } from '@/utils/getListCheckout'
import { getUserAddress } from '@/utils/getUserAddress'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaLinkedin } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LIST_BANK } from '@/constans/listBank'

const CheckOut = () => {
    const navigate = useNavigate()

    const [languageStorage] = useAtom(languageStorageAtom)
    const [emailStorage] = useAtom(emailstorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [chosedAddressStorage] = useAtom(chosedAddressStorageAtom)
    const [methodPayment, setMethodPayment] = useAtom(methodPaymentStorageAtom)
    const [bankStorage, setBankStorage] = useAtom(choosedBankStorageAtom)

    const [, setIsOpenModalAddress] = useAtom(isOpenModalAddressAtom)
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [, setPrintStrukModal] = useAtom(printStrukModalAtom)
    const [refresh] = useAtom(refreshAtom)

    const [notifMessage, setNotifMessage] = useState(null)
    const [mainAddress, setMainAddress] = useState(null)
    const [checkOutList, setCheckOutList] = useState([])
    const [isOpenMethodPay, setIsOpenMethodPay] = useState(false)

    const linkedIn = "https://www.linkedin.com/in/taufiq-rahman-98a322356"


    useEffect(() => {
        const fetchMyAddress = async () => {
            if (emailStorage && tokenStorage) {
                try {
                    const checkout = await getListCheckOut({ email: emailStorage, token: tokenStorage })

                    setCheckOutList(checkout)

                    const addr = await getUserAddress({ token: tokenStorage })

                    const chosed = addr.find(item => item._id === chosedAddressStorage)

                    setMainAddress(!chosed ? addr[0] : chosed)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchMyAddress()
    }, [emailStorage, tokenStorage, refresh])

    const formatCurrency = (num) => {
        if (num) {
            let formatted = new Intl.NumberFormat("id-ID", {
                style: 'currency',
                currency: "IDR",
                minimumFractionDigits: 3
            }).format(num)

            return formatted
        }
    }

    const hitungTotal = checkOutList.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <BrowseLayout>
            <div className='relative bg-gray-100'>
                {notifMessage && <Notify
                    message={notifMessage}
                    style={"toast-middle"}
                    styleMessage={"bg-black/50 flex flex-col text-[14px] sm:text-2xl p-2 sm:p-6"}
                    onClose={() => mainAddress ?
                        setNotifMessage(null) ||
                        setPrintStrukModal(true)
                        :
                        setNotifMessage(null)
                    }
                    isShowIcon={mainAddress ? true : false}
                />}
                <header className='relative fixed w-full'>
                    <nav className='p-2 fixed z-50 w-full bg-blue-500'>
                        <div className='max-w-sm sm:max-w-7xl mx-auto'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-2 sm:gap-4 text-white text-[8px] sm:text-sm'>
                                    <EachUtils
                                        of={languageStorage === "en" ? LIST_NAVBAR_EN : LIST_NAVBAR_ID}
                                        render={(item, index) => (
                                            <div key={index}>
                                                <a
                                                    className='hover:underline hover:text-gray-200 cursor-pointer'
                                                    href={item.url}
                                                >{item.title}</a>
                                            </div>
                                        )}
                                    />
                                    <div>
                                        <a href={linkedIn}>
                                            <FaLinkedin className='cursor-pointer text-[9px] sm:text-[18px] mt-0.5 sm:mt-0' />
                                        </a>
                                    </div>
                                </div>
                                <div className='flex gap-1.5 sm:gap-4 text-white text-[6px] sm:text-sm items-center'>
                                    <OptionLanguage />
                                    <AccountMenu />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className='flex fixed z-10 w-full items-center gap-2 sm:gap-4 px-3 sm:px-6 pt-2 sm:pt-0 bg-white shadow-md h-20 sm:h-34'>
                        <div
                            className='flex items-center gap-1 cursor-pointer mt-4.5 sm:mt-9'
                            onClick={() => navigate('/')}
                        >
                            <div className='relative'>
                                <SiShopify
                                    className='text-[32px] sm:text-[60px] text-blue-500'
                                />
                                <p
                                    className='absolute top-1.5 sm:top-4 left-2 sm:left-3 font-black text-white bg-blue-500 sm:rotate-6 rotate-8 sm:text-4xl text-[16px] rounded-full'
                                >E</p>
                            </div>
                            <div className='flex gap-2 sm:gap-4 items-center'>
                                <h2 className='text-blue-500 text-[18px] sm:text-3xl font-semibold font-serif'>EcoMart</h2>
                                <span className='text-[16px] sm:text-2xl text-gray-300'>|</span>
                                <h3
                                    className='text-[16px] sm:text-2xl text-blue-600'>
                                    {languageStorage === "en" ? "Check Out" : "Checkout"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`relative ${isOpenMethodPay === true ? 'h-full' : 'h-[625px]'} border-b-4 border-b-blue-600 py-4 sm:py-8 pt-24 sm:pt-42`}>
                    <div>
                        <div
                            className='bg-white max-w-[355px] sm:max-w-7xl mx-auto mb-2 sm:mb-4 p-4 sm:p-8 rounded rounded-xs'>
                            <div>
                                <div className='flex flex-col gap-1 sm:gap-2'>

                                    <div className='flex items-center gap-1'>
                                        <FaLocationDot className='text-[12px] sm:text-[18px] text-red-500' />
                                        <p className='text-[11px] sm:text-xl text-blue-500'>
                                            {languageStorage === "en" ? "Delivery Address" : "Alamat Pengiriman"}
                                        </p>
                                    </div>

                                    {!mainAddress ?
                                        <div className='w-full flex justify-between items-center'>
                                            <p>
                                                {languageStorage === "en" ? "Address has not been added..." : "Alamat belum ditambahkan..."}
                                            </p>
                                            <button
                                                onClick={() => setIsOpenModal(true)}
                                                className='text-sm cursor-pointer hover:text-blue-400'>
                                                {languageStorage === "en" ? "Add" : "Tambah"}
                                            </button>
                                        </div>
                                        : (
                                            <div className='flex justify-between items-center gap-3'>
                                                <h3 className='font-semibold max-w-xs text-[10px] sm:text-lg'>
                                                    {mainAddress?.fullName} {mainAddress?.phone}
                                                </h3>
                                                <p className='text-[9px] sm:text-[16px]'>
                                                    {mainAddress?.street}, {mainAddress?.district} ({mainAddress?.detail}), {mainAddress?.city}, {mainAddress?.province}, {mainAddress?.postalCode}
                                                </p>
                                                <div className='flex gap-1 sm:gap-6 items-center'>
                                                    {mainAddress?.isPrimary && (
                                                        <p className='text-[6px] sm:text-[11px] font-bold border border-blue-500 text-blue-500 py-0.5 px-0.5 sm:px-1'>
                                                            {languageStorage === "en" ? "Default" : "Utama"}
                                                        </p>
                                                    )}
                                                    <button
                                                        onClick={() => setIsOpenModalAddress(true)}
                                                        className='text-[9px] sm:text-sm text-black cursor-pointer hover:underline'>
                                                        {languageStorage === "en" ? "Change" : "Ubah"}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <div
                            className='flex flex-col gap-4 sm:gap-6 bg-white max-w-[355px] sm:max-w-7xl w-full mx-auto p-4 sm:p-8 rounded rounded-xs'
                        >
                            <div className='flex justify-between gap-4 items-center'>
                                <h3 className='font-semibold text-[10px] sm:text-xl'>
                                    {languageStorage === "en" ? "Products Ordered" : "Produk Dipesan"}
                                </h3>
                                <div className='flex max-w-[180px] w-full sm:max-w-xl justify-between gap-3 sm:gap-6'>
                                    <p
                                        className='text-[9px] sm:text-[16px]'
                                    >{languageStorage === "en" ? "Unit Price" : "Harga Satuan"}</p>
                                    <p
                                        className='text-[9px] sm:text-[16px]'
                                    >{languageStorage === "en" ? "Amount" : "Jumlah"}</p>
                                    <p
                                        className='text-[9px] sm:text-[16px]'
                                    >{languageStorage === "en" ? "Item Subtotal" : "Subtotal Produk"}</p>
                                </div>
                            </div>
                            <EachUtils
                                of={checkOutList}
                                render={(item, index) => (
                                    <div
                                        key={index}
                                    >
                                        <div className='flex justify-between items-center'>
                                            <div className='flex gap-1.5 sm:gap-3 items-center max-w-[100px]'>
                                                <img
                                                    src={item.image}
                                                    className='w-8 sm:w-18'
                                                />
                                                <p className='text-[8px] sm:text-sm'>{item.title}</p>
                                            </div>
                                            <div className='flex justify-between max-w-[180px] sm:max-w-xl w-full gap-2 sm:gap-6'>
                                                <p
                                                    className='text-[9px] sm:text-sm'
                                                >{formatCurrency(item.price)}</p>
                                                <p
                                                    className='text-[9px] sm:text-sm'
                                                >{item.quantity}</p>
                                                <p
                                                    className='text-[9px] sm:text-sm'
                                                >{formatCurrency(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                        <div className='border-b-gray-300 border-b-2 max-w-[355px] sm:max-w-7xl mx-auto pt-1 sm:pt-2' />
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div
                        className='w-full max-w-[355px] sm:max-w-7xl mx-auto mt-2 sm:mt-4 bg-white '
                    >
                        <div className='flex items-center justify-between p-4 sm:px-8 sm:py-6'>
                            <h3 className='text-[11px] sm:text-lg'>
                                {languageStorage === "en" ? "Payment Method" : "Metode Pembayaran"}
                            </h3>

                            <motion.div
                                initial={{ translateY: -10 }}
                                animate={{ translateY: isOpenMethodPay == true ? 0 : -10 }}
                                transition={{ ease: 'easeIn' }}
                                style={{ display: isOpenMethodPay == true ? "block" : "none" }}>
                                <button
                                    onClick={() => setMethodPayment('cod')}
                                    className={`relative border ${methodPayment === "cod" ? "border-blue-400" : "border-gray-200"} px-3 sm:px-6 py-0.5 sm:py-1 cursor-pointer hover:text-blue-400 hover:border-blue-400 mr-2 sm:mr-4 text-[10px] sm:text-[16px]`}
                                >COD
                                    <span
                                        style={{ display: methodPayment === "cod" ? "block" : "none" }}
                                        className='absolute bottom-0 right-0 w-0 h-0 border-l-[9px] sm:border-l-[18px] border-b-[9px] sm:border-b-[18px] border-transparent border-b-blue-400' />
                                    <FaCheck
                                        style={{ display: methodPayment === "cod" ? "block" : "none" }}
                                        className='absolute bottom-[1px] sm:bottom-[2px] right-[1px] sm:right-[2px] font-bold text-white text-[3.5px] sm:text-[8.5px]'
                                    />
                                </button>
                                <button
                                    onClick={() => setMethodPayment('bank')}
                                    className={`relative border ${methodPayment === "bank" ? "border-blue-400" : "border-gray-200"} px-3 sm:px-6 py-0.5 sm:py-1 cursor-pointer hover:text-blue-400 hover:border-blue-400 text-[10px] sm:text-[16px]`}
                                >
                                    Transfer Bank
                                    <span
                                        style={{ display: methodPayment === "bank" ? "block" : "none" }}
                                        className='absolute bottom-0 right-0 w-0 h-0 border-l-[9px] sm:border-l-[18px] border-b-[9px] sm:border-b-[18px] border-transparent border-b-blue-400' />
                                    <FaCheck
                                        style={{ display: methodPayment === "bank" ? "block" : "none" }}
                                        className='absolute bottom-[1px] sm:bottom-[2px] right-[1px] sm:right-[2px] font-bold text-white text-[3.5px] sm:text-[8.5px]'
                                    />
                                </button>
                            </motion.div>
                            <div
                                style={{ display: isOpenMethodPay === false ? 'block' : 'none' }}
                            >
                                {!methodPayment || methodPayment === 'bank' && !bankStorage ? (
                                    <div className='flex items-center gap-2 sm:gap-6'>
                                        <p
                                            className='text-[9px] sm:text-[16px]'
                                        >{languageStorage === 'en' ? 'Select method payment...' : 'Pilih metode pembayaran...'}</p>
                                        <button
                                            onClick={() => setIsOpenMethodPay(true)}
                                            className='cursor-pointer hover:text-blue-400 text-[9px] sm:text-[16px]'
                                        >
                                            {languageStorage === "en" ? "Add" : "Tambah"}
                                        </button>
                                    </div>
                                )
                                    :
                                    (
                                        <div className='flex items-center gap-2 sm:gap-6'>
                                            <p
                                                className='text-[9px] sm:text-[16px]'
                                            >{
                                                methodPayment === "bank" ? bankStorage + " - Transfer Bank" :
                                                    methodPayment === "cod" ? "COD - Cash on Delivery" : null
                                                }
                                            </p>
                                            <button
                                                onClick={() => setIsOpenMethodPay(true)}
                                                className='cursor-pointer hover:text-blue-400 text-[9px] sm:text-[16px]'
                                            >
                                                {languageStorage === "en" ? "Change" : "Ubah"}
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <motion.div
                            initial={{ translateY: -10 }}
                            animate={{ translateY: isOpenMethodPay === true ? 0 : -10 }}
                            style={{ display: isOpenMethodPay === true ? 'block' : 'none' }}
                            className='px-4 sm:px-8 py-5 sm:py-10 border-t-gray-200 border-t-1'>
                            <div className='flex gap-6 sm:gap-20'>
                                {methodPayment === 'bank' ? (
                                    <div className='flex gap-8 sm:gap-20'>
                                        <h3 className='text-[11px] sm:text-lg'>
                                            {languageStorage === 'en' ? 'Choose Bank' : 'Pilih Bank'}
                                        </h3>
                                        <div className='grid grid-cols-2 items-center sm:grid-cols-1 gap-2 sm:gap-14'>
                                            <EachUtils
                                                of={LIST_BANK}
                                                render={(item, index) => (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div className='flex items-center gap-3 sm:gap-8'>
                                                            <input
                                                                checked={bankStorage === item.title}
                                                                onChange={() => setBankStorage(item.title)}
                                                                type='radio'
                                                                className='radio checked:bg-blue-500 checked:text-white w-[16px] h-[16px] sm:w-[22px] sm:h-[22px]'
                                                            />
                                                            <div className='flex gap-2 sm:gap-4 items-center'>
                                                                <div className='border border-gray-200 py-0.5 sm:py-1 px-1 sm:px-2'>
                                                                    <img
                                                                        src={item.image}
                                                                        className='object-cover w-6 sm:w-11'
                                                                    />
                                                                </div>
                                                                <p className='text-[8.5px] sm:text-[16px]'>{item.title}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </div>
                                )
                                    :
                                    (
                                        <div className='flex gap-6 sm:gap-20'>
                                            <p className='text-[10px] sm:text-[16px]'>COD</p>
                                            <p className='text-[10px] sm:text-[16px]'>
                                                {languageStorage === 'en' ? 'Cash on Delivery' : 'Pembayaran Tunai'}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>
                        </motion.div>
                        <div className='w-full max-w-[355px] sm:max-w-7xl mx-auto pt-2 sm:pt-4 bg-blue-100/30 p-2 sm:p-8 border-t-1 border-t-gray-300'>
                            <div className='flex justify-between'>
                                <div />
                                <div className='flex flex-col gap-2 sm:gap-4'>
                                    <div className='flex justify-between gap-2 sm:gap-4 items-center'>
                                        <p className='text-[10px] sm:text-[16px]'>
                                            {languageStorage === "en" ? "Order Subtotal" : "Subtotal Pesanan"}
                                        </p>
                                        <p
                                            className='text-[10px] sm:text-[16px]'
                                        >{formatCurrency(hitungTotal)}</p>
                                    </div>
                                    <div className='flex justify-between gap-2 sm:gap-4 items-center'>
                                        <p className='text-[10px] sm:text-[16px]'>
                                            {languageStorage === "en" ? "Total Payment" : "Total Pembayaran"}
                                        </p>

                                        <p className='text-[14px] sm:text-2xl text-blue-500 font-semibold'>{formatCurrency(hitungTotal)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between items-center max-w-[355px] sm:max-w-7xl mx-auto pt-2 sm:pt-4 bg-blue-100/30 p-4 sm:py-4 sm:px-8 border-t-2 border-t-gray-300 border-dotted'>
                            <div />
                            <button
                                onClick={() => {
                                    mainAddress ?
                                        setNotifMessage('Pesanan Anda Berhasil Dibuat')
                                        :
                                        setNotifMessage('Tambahkan alamat terlebih dahulu!')
                                }}
                                className='w-22 sm:w-45 py-1 sm:py-2 px-2 sm:px-4 rounded text-white text-[10px] sm:text-lg font-semibold bg-indigo-500 cursor-pointer hover:bg-indigo-600'>
                                {languageStorage === "en" ? "Place Order" : "Buat Pesanan"}
                            </button>
                        </div>
                    </div>
                </div>
                <Footer style={"bg-white"} />

                {!mainAddress ?
                    <AddressModal
                        address={mainAddress}
                    />
                    :
                    <AddressListModal
                        addressed={mainAddress}
                    />}
                <PrintStruk
                    total={hitungTotal}
                    address={mainAddress}
                    order={checkOutList}
                />
            </div>
        </BrowseLayout>
    )
}

export default CheckOut