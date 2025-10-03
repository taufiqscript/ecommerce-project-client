import { cartListStorageAtom, dataProductAtom, idProductAtom, isOpenModalAtom, languageStorageAtom, refreshAtom, tokenStorageAtom } from '@/jotai/atoms'
import { getProductDetail } from '@/utils/getProductDetail'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { MdClose, MdRemoveShoppingCart } from 'react-icons/md'
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa'
import { BsCart4, BsCartPlusFill } from 'react-icons/bs'
import Notify from '../../Notify'
import { checkIsAdded } from '@/utils/checkIsAdded'
import { addToShoppingCart } from '@/utils/addToShoppingCart'
import { removeFromCart } from '@/utils/removeFromCart'
import { addToCheckout } from '@/utils/addToCheckout'

const Modal = () => {
    const [languageStorage] = useAtom(languageStorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [, setCartList] = useAtom(cartListStorageAtom)

    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [idProduct, setIdProduct] = useAtom(idProductAtom)
    const [, setRefresh] = useAtom(refreshAtom)

    const [productDetail, setProductDetail] = useState([])
    const [notifMessage, setNotifMessage] = useState(null)
    const [isAdded, setIsAdded] = useState(true)

    useEffect(() => {
        if (isOpenModal && idProduct) {
            getProductDetail({ idProd: idProduct }).then(result => setProductDetail({ ...result, quantity: 1 }))
            checkIsAdded({ idProduct, token: tokenStorage }).then(result => setIsAdded(result))
        }
    }, [isOpenModal, idProduct])

    const rate = productDetail?.rating?.rate
    const count = productDetail?.rating?.count

    const renderStarts = (rating) => {
        const maxStars = 5

        return Array.from({ length: maxStars }, (_, i) => {
            const diff = rating - i

            if (diff >= 1) {
                return <FaStar key={i} className='text-yellow-400' />
            } else if (diff >= 0.25) {
                return <FaStarHalfAlt key={i} className='text-yellow-400' />
            } else {
                return <FaRegStar key={i} className='text-gray-300' />
            }
        })
    }

    const formatCurrency = (num) => {
        let formatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 3
        }).format(num)
        return formatted
    }

    const handleQuantity = (type) => {
        setProductDetail(prev => {
            const newQuantity = type === "inc" ? prev.quantity + 1 : Math.max(1, prev.quantity - 1)

            setCartList(item => item.id === prev.id ? { ...item, quantity: newQuantity } : item)

            return { ...prev, quantity: newQuantity }
        })
    }

    return (
        <dialog className={`modal ${isOpenModal && idProduct ? 'modal-open' : ''}`}>
            <div
                className='relative bg-white max-w-[340px] sm:max-w-2xl w-full rounded-md h-auto sm:h-screen overflow-y-auto scroll-smooth'
            >
                {notifMessage && <Notify message={notifMessage} style={"toast-middle"} styleMessage={"bg-black/60 flex flex-col text-sm sm:text-2xl"} isShowIcon={true} onClose={() => setNotifMessage(null)} />}
                <div
                    className='relative w-full'
                >
                    <img
                        src='/OK.png'
                        className='relative h-[325px] sm:h-[650px] w-full object-cover'
                    />
                    <img
                        src={productDetail?.image}
                        className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-[180px] sm:max-w-md object-cover z-10'
                    />
                    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center max-w-xl w-full'>
                        <h3 className='text-xl sm:text-4xl font-black text-white text-shadow-lg/80'>{productDetail?.title}</h3>
                        <p className='sm:mt-2 text-lg sm:text-5xl font-black text-white text-shadow-lg/80 text-yellow-400'>
                            {languageStorage === "en" ? "Price: " : "Harga: "}{formatCurrency(productDetail?.price)}</p>
                    </div>
                </div>

                <MdClose
                    className='absolute top-1 sm:top-2 right-1 sm:right-2 text-[24px] sm:text-[32px] cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded-full transition-all'
                    onClick={() => {
                        setIdProduct(null)
                        setIsOpenModal(false)
                    }}
                />
                <div className='bg-black h-auto p-1 sm:p-2 text-white'>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-2 sm:gap-4'>
                            <p className='flex items-center text-[10px] sm:text-lg gap-1'>
                                <span className='text-[10px] sm:text-lg underline'>{rate}</span>
                                {renderStarts(rate)}
                            </p>
                            <div>|</div>
                            <p className='flex items-center text-[10px] sm:text-lg gap-1'>
                                <span className='underline'>{count}</span>
                                ratings
                            </p>
                        </div>
                        <div className='flex items-start gap-1 sm:gap-6'>
                            <div className='bg-white text-black font-semibold w-16 sm:w-26 h-5 sm:h-10'>
                                <div className='flex items-center justify-between h-full'>
                                    <button
                                        onClick={() => handleQuantity("dec")}
                                        className='w-full h-full text-[10px] sm:text-lg font-semibold hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer'
                                    >-</button>
                                    <p className='border-gray-300 border-x-1 w-full text-[10px] sm:text-lg text-center'>{productDetail?.quantity}</p>
                                    <button
                                        onClick={() => handleQuantity("inc")}
                                        className='font-semibold text-[10px] sm:text-lg w-full h-full hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer'
                                    >+</button>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        isAdded ?
                                            removeFromCart({
                                                cartId: idProduct,
                                                token: tokenStorage,
                                                setIsAdded,
                                                setNotifMessage,
                                                setRefresh
                                            })
                                            :
                                            addToShoppingCart({
                                                data: { ...productDetail, quantity: productDetail.quantity },
                                                token: tokenStorage,
                                                setNotifMessage,
                                                setIsAdded,
                                                setRefresh
                                            })
                                    }}
                                    className='flex items-center gap-0.5 sm:gap-1.5 justify-center bg-indigo-500 p-1 sm:p-2 w-22 sm:w-55 cursor-pointer hover:bg-indigo-600 transition-all'
                                >
                                    {
                                        isAdded ?
                                            <MdRemoveShoppingCart className='text-[12px] sm:text-[24px]' /> :
                                            <BsCartPlusFill className='text-[12px] sm:text-[24px]' />
                                    }
                                    {
                                        isAdded ?
                                        (
                                                <p
                                                    className='text-[6px] sm:text-[16px] pt-0.5 sm:pt-0'
                                                >{languageStorage === "en" ? "Remove From Cart" : "Hapus Dari Keranjang"}
                                                </p>
                                        )
                                        :
                                        (
                                                <p
                                                    className='text-[6px] sm:text-[16px] pt-0.5 sm:pt-0'
                                                >{languageStorage === "en" ? "Add To Cart" : "Masukkan Keranjang"}
                                                </p>
                                        )
                                    }
                                </button>
                                <button
                                    onClick={() => addToCheckout({
                                        data: productDetail,
                                        token: tokenStorage,
                                        setNotifMessage
                                    })}
                                    className='flex items-center gap-1.5 justify-center bg-green-400 p-1 sm:p-2 w-22 sm:w-55 cursor-pointer hover:bg-green-500 transition-all mt-1 sm:mt-2'
                                >
                                    <BsCart4 className='text-[12px] sm:text-[24px]' />
                                    <div className='text-[6px] sm:text-[16px] pt-0.5 sm:pt-0'>
                                    {languageStorage === "en" ? "Buy Now" : "Beli Sekarang"}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='py-1 sm:py-2'>
                        <h3 className='text-[10px] sm:text-[16px] font-semibold underline'>Description:</h3>
                        <p className='text-[8px] sm:text-[14px]'>
                            {productDetail?.description}
                        </p>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Modal