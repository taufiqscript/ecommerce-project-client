import { choosedBankStorageAtom, methodPaymentStorageAtom, printStrukModalAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React, { useRef } from 'react'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

const PrintStruk = ({ total, address, order }) => {
    const navigate = useNavigate()

    const [methodPayment, setMethodPayment] = useAtom(methodPaymentStorageAtom)
    const [bankStorage, setBankStorage] = useAtom(choosedBankStorageAtom)

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

    return (
        <dialog className={`modal ${printStrukModal && 'modal-open'}`}>
            <div className='bg-white overflow-y-scroll scroll-smooth w-full max-w-md max-h-lg h-full'>

                <div
                    ref={componentRef}
                    className='bg-white rounded py-6 px-8 '
                >
                    <div
                        className='flex flex-col gap-1 py-2 cursor-pointer border-b-gray-300 border-b-1'
                        onClick={() => navigate('/')}
                    >
                        <div className='relative m-auto'>
                            <SiShopify
                                size={60}
                                className='text-black'
                            />
                            <p
                                className='absolute top-4 left-3 font-black text-white bg-black rotate-6 text-4xl'
                            >E</p>
                        </div>
                        <div className='flex flex-col gap-0.5 text-center'>
                            <h3 className='text-black text-3xl font-semibold font-serif'>EcoMart</h3>
                            <p>Jl. Jatiwaringin Raya Gang Swadaya 1 Pondok Gede - Bekasi</p>
                            <p>No. Telp 081328233697</p>
                        </div>
                    </div>
                    <div className='py-4 border-dashed border-b-2 border-b-gray-400'>
                        <p className='font-bold'>No. Pesanan: {generateOrderNumber()}</p>
                        <div className='grid grid-cols-2 gap-4 items-center pt-5'>
                            <p className='flex flex-col'>
                                Total Pembayaran
                                <span className='font-bold'>{formatCurrency(total)}</span>
                            </p>
                            <p className='flex flex-col'>
                                Waktu Pembayaran
                                <span className='font-bold'>{nowDate()}</span>
                            </p>
                        </div>
                    </div>
                    <div className='py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div className='grid grid-cols-2 gap-4 items-top'>
                            <p className='flex flex-col'>
                                Rincian Pengiriman:
                                <span className='text-sm pt-3'>
                                    <div>{address?.fullName}</div>
                                    {address?.street} ({address?.detail}), {address?.city} {address?.district}, {address?.province}, {address?.postalCode}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Metode Pembayaran:
                                <span className='pt-3 text-sm'>
                                    {
                                        methodPayment === "bank" ? bankStorage + " - Transfer Bank" :
                                            methodPayment === "cod" ? "COD - Cash on Delivery" : null
                                    }
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div>
                            <div className='flex flex-col'>
                                Rincian Pesanan:
                                <EachUtils
                                    of={order}
                                    render={(item, index) => (
                                        <div
                                            key={index}
                                            className='pt-3 flex justify-between items-center text-sm'
                                        >
                                            <p className='max-w-xs'>{item?.title}</p>
                                            <div className='text-right'>
                                                <p>x {item?.quantity}</p>
                                                <p>{formatCurrency(item?.price * item?.quantity)}</p>
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='py-4 border-dashed border-b-2 border-b-gray-400'>
                        <div className='flex justify-between items-center text-lg'>
                            Total Pembayaran
                            <p>{formatCurrency(total)}</p>
                        </div>
                    </div>
                </div>

                <div className='flex gap-6 justify-end items-center px-8 pb-2'>
                    <button
                        onClick={() => setPrintStrukModal(false)}
                        className='btn btn-ghost w-28'>
                        Tutup
                    </button>
                    <button
                        onClick={handlePrintStruk}
                        className='btn btn-primary text-white w-28'>
                        Cetak
                    </button>
                </div>
            </div>
        </dialog>
    )
}

export default PrintStruk