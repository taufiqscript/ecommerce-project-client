import { midtransNotificationStorageAtom, printStrukModalAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

const PrintStruk = ({ total, address, order }) => {
    const navigate = useNavigate()

    const [midtransStorage, setMidtransStorage] = useAtom(midtransNotificationStorageAtom)

    const [printStrukModal, setPrintStrukModal] = useAtom(printStrukModalAtom)

    const generateOrderNumber = () => {
        let now = new Date()

        let formattedDate = now.getFullYear().toString() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(now.getSeconds()).padStart(2, '0')

        let randomPart = Math.floor(10000 + Math.random() * 90000)

        return formattedDate + randomPart
    }

    const formatCurrency = (num) => {
        if (num) {
            const formatted = new Intl.NumberFormat('id-ID', {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 3
            }).format(num)

            return formatted
        }
    }

    const nowDate = () => {
        let now = new Date()

        let formatted = now.getDate().toString().padStart(2, '0') + '/' +
            String(now.getMonth() + 1).padStart(2, '0') + '/' +
            String(now.getFullYear()).toString()

        return formatted
    }

    const componentRef = useRef(null)

    const handlePrintStruk = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Struk-EcoMart-${Date.now()}`
    })

    const paymentType = midtransStorage?.payment_type
    const bank = midtransStorage?.va_numbers?.map(item => item.bank).join('')
    console.log(bank)
    return (
        <dialog className={`modal ${printStrukModal && 'modal-open'}`}>
            <div className='bg-white overflow-y-scroll scroll-smooth w-full max-w-xs sm:max-w-md h-auto sm:h-screen py-4 sm:py-0 rounded'>

                <div
                    ref={componentRef}
                    className='bg-white rounded py-1.5 sm:py-6 px-4 sm:px-8 '
                >
                    <div
                        className='flex flex-col gap-0.5 sm:gap-1 py-1 sm:py-2 cursor-pointer border-b-gray-300 border-b-1'
                        onClick={() => navigate('/')}
                    >
                        <div className='relative m-auto'>
                            <SiShopify
                                className='text-[38px] sm:text-[60px] text-black'
                            />
                            <p
                                className='absolute top-2 sm:top-4 left-2 sm:left-3 font-black text-white bg-black rotate-8 w-4 sm:rotate-6 text-[18px] sm:text-4xl rounded-full'
                            >E</p>
                        </div>
                        <div className='flex flex-col gap-0.5 text-center'>
                            <h3 className='text-black text-lg sm:text-3xl font-semibold font-serif'>EcoMart</h3>
                            <p
                                className='text-[10px] sm:text-[16px]'
                            >Jl. Jatiwaringin Raya Gang Swadaya 1 Pondok Gede - Bekasi</p>
                            <p
                                className='text-[10px] sm:text-[16px]'
                            >No. Telp 081328233697</p>
                        </div>
                    </div>
                    <div className='py-2 sm:py-4 border-dashed border-b-2 border-b-gray-400'>
                        <p className='text-[12px] sm:text-[16px] font-bold'>No. Pesanan:<br /> {midtransStorage?.order_id}</p>
                        <div className='grid grid-cols-2 gap-2 sm:gap-4 items-center pt-2.5 sm:pt-5'>
                            <p className='flex flex-col text-[12px] sm:text-[16px]'>
                                Total Pembayaran
                                <span className='font-bold'>{formatCurrency(total)}</span>
                            </p>
                            <p className='flex flex-col text-[12px] sm:text-[16px]'>
                                Waktu Pembayaran
                                <span className='font-bold'>{nowDate()}</span>
                            </p>
                        </div>
                    </div>
                    <div className='py-2 sm:py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div className='grid grid-cols-2 gap-2 sm:gap-4 items-top'>
                            <p className='flex flex-col text-[12px] sm:text-[16px]'>
                                Rincian Pengiriman:
                                <span className='text-[10px] sm:text-sm pt-1.5 sm:pt-3'>
                                    <div>{address?.fullName}</div>
                                    {address?.street} ({address?.detail}), {address?.city} {address?.district}, {address?.province}, {address?.postalCode}
                                </span>
                            </p>
                            <p className='flex flex-col text-[12px] sm:text-[16px]'>
                                Metode Pembayaran:
                                <span className='pt-1.5 sm:pt-3 text-[10px] sm:text-sm'>
                                    {
                                        paymentType === 'bank_transfer' ? (
                                            <>Transfer Bank<br />
                                                {
                                                    bank === 'bri' ? 'Bank BRI'
                                                        :
                                                        bank === 'bca' ? 'Bank BCA'
                                                            :
                                                            bank === 'bni' ? 'Bank BNI'
                                                                :
                                                                bank === 'permata' ? 'Bank Permata'
                                                                    :
                                                                    bank === 'cimb' ? 'Bank CIMB Niaga'
                                                                        :
                                                                        bank === 'danamon' ? 'Bank Danamon'
                                                                            :
                                                                            bank === 'bsi' ? 'Bank BSI'
                                                                                : ''
                                                }
                                            </>
                                        )
                                            :
                                            paymentType === 'qris' ? (
                                                <>QRIS<br />( GoPay / ShopeePay )</>
                                            )
                                                :
                                                paymentType === 'cstore' ? (
                                                    <>CS Store<br />( Alfamart / Indomart )</>
                                                )
                                                    : ''
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='py-2 sm:py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div>
                            <div className='flex flex-col text-[12px] sm:text-[16px]'>
                                Rincian Pesanan:
                                <EachUtils
                                    of={order}
                                    render={(item, index) => (
                                        <div
                                            key={index}
                                            className='pt-1.5 sm:pt-3 flex justify-between items-center text-sm'
                                        >
                                            <p className='max-w-xs text-[10px] sm:text-[16px]'>{item?.title}</p>
                                            <div className='text-right'>
                                                <p
                                                    className='text-[10px] sm:text-[16px]'>x {item?.quantity}</p>
                                                <p
                                                    className='text-[10px] sm:text-[16px]'
                                                >{formatCurrency(item?.price * item?.quantity)}</p>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='py-2 sm:py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div className='flex justify-between items-center text-[12px] sm:text-lg'>
                            Total Pembayaran
                            <p
                                className='text-[14px] sm:text-[18px]'
                            >{formatCurrency(total)}</p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-3 mt-4 sm:gap-6 justify-end items-center px-4 sm:px-8 pb-1 sm:pb-2'>
                    <button
                        onClick={() => setPrintStrukModal(false)}
                        className='btn btn-ghost w-14 sm:w-28 h-7 sm:h-10'>
                        Tutup
                    </button>
                    <button
                        onClick={handlePrintStruk}
                        className='btn btn-primary bg-blue-500 hover:bg-blue-600 border-none text-white w-14 sm:w-28 h-7 sm:h-10'>
                        Cetak
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default PrintStruk