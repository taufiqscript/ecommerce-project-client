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
            {notifMessage && <Notify message={notifMessage} style={"toast-middle"} styleMessage={"bg-black/60 flex flex-col text-2xl"} isShowIcon={true} onClose={() => setNotifMessage(null)} />}
            <div
                className='relative bg-white max-w-2xl w-full rounded-md h-screen overflow-y-auto scroll-smooth'
            >
                <div
                    className='relative w-full'
                >
                    <img
                        src='/OK.png'
                        className='relative h-[650px] w-full object-cover'
                    />
                    <img
                        src={productDetail?.image}
                        className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-md object-cover z-10'
                    />
                    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center max-w-xl w-full'>
                        <h3 className='text-4xl font-black text-white text-shadow-lg/80'>{productDetail?.title}</h3>
                        <p className='mt-2 text-5xl font-black text-white text-shadow-lg/80 text-yellow-400'>
                            {languageStorage === "en" ? "Price: " : "Harga: "}{formatCurrency(productDetail?.price)}</p>
                    </div>
                </div>

                <MdClose
                    size={32}
                    className='absolute top-2 right-2 cursor-pointer hover:bg-red-500 hover:text-white p-1 rounded-full transition-all'
                    onClick={() => {
                        setIdProduct(null)
                        setIsOpenModal(false)
                    }}
                />
                <div className='bg-black p-2 text-white'>
                    <div className='flex justify-between items-start'>
                        <div className='flex items-center gap-4'>
                            <p className='flex items-center gap-1'>
                                <span className='underline'>{rate}</span>
                                {renderStarts(rate)}
                            </p>
                            <div>|</div>
                            <p className='flex items-center gap-1'>
                                <span className='underline'>{count}</span>
                                ratings
                            </p>
                        </div>
                        <div className='flex items-start gap-6'>
                            <div className='bg-white text-black font-semibold w-26 h-10'>
                                <div className='flex items-center justify-between h-full'>
                                    <button
                                        onClick={() => handleQuantity("dec")}
                                        className='w-full h-full text-lg font-semibold hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer'
                                    >-</button>
                                    <p className='border-gray-300 border-x-1 w-11 text-center w-full'>{productDetail?.quantity}</p>
                                    <button
                                        onClick={() => handleQuantity("inc")}
                                        className='font-semibold text-lg w-full h-full hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer'
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
                                    className='flex items-center gap-1.5 justify-center bg-indigo-500 p-2 w-55 cursor-pointer hover:bg-indigo-600 transition-all'
                                >
                                    {isAdded ? <MdRemoveShoppingCart size={24} /> : <BsCartPlusFill size={24} />}
                                    {isAdded ?
                                        (
                                            <p>{languageStorage === "en" ? "Remove From Cart" : "Hapus Dari Keranjang"}</p>
                                        )
                                        :
                                        (
                                            <p>{languageStorage === "en" ? "Add To Cart" : "Masukkan Keranjang"}</p>
                                        )
                                    }
                                </button>
                                <button
                                    onClick={() => addToCheckout({
                                        data: productDetail,
                                        token: tokenStorage,
                                        setNotifMessage
                                    })}
                                    className='flex items-center gap-1.5 justify-center bg-green-400 p-2 w-55 cursor-pointer hover:bg-green-500 transition-all mt-2'
                                >
                                    <BsCart4 size={24} />
                                    {languageStorage === "en" ? "Buy Now" : "Beli Sekarang"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='py-2'>
                        <h3 className='font-semibold underline'>Description:</h3>
                        <p>
                            {productDetail?.description}
                        </p>
                    </div>
                </div>
            </div>
        </dialog>
    )
}

export default Modal