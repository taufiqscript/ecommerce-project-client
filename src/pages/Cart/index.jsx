import BrowseLayout from '@/components/layouts/BrowseLayout'
import AccountMenu from '@/components/modules/Browse/AccountMenu'
import Footer from '@/components/modules/Landing/Footer'
import OptionLanguage from '@/components/modules/Landing/OptionLanguage'
import Notify from '@/components/modules/Notify'
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from '@/constans/listNavbar'
import { cartListStorageAtom, emailstorageAtom, languageStorageAtom, refreshAtom, tokenStorageAtom } from '@/jotai/atoms'
import { addToCheckout } from '@/utils/addToCheckout'
import EachUtils from '@/utils/EachUtils'
import { getMyShoppingCart } from '@/utils/getMyShoppingCart'
import { removeFromCart } from '@/utils/removeFromCart'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import { FcShop } from 'react-icons/fc'
import { MdShoppingCartCheckout } from 'react-icons/md'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate()

    const [languageStorage] = useAtom(languageStorageAtom)
    const [emailStorage] = useAtom(emailstorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [cartList, setCartList] = useAtom(cartListStorageAtom)

    const [refresh, setRefresh] = useAtom(refreshAtom)

    const [notifMessage, setNotifMessage] = useState(null)
    const [, setIsAdded] = useState(true)
    const [selectedItem, setSelectedItem] = useState([])

    const linkedIn = "https://www.linkedin.com/in/taufiq-rahman-98a322356"


    useEffect(() => {
        if (emailStorage && tokenStorage && cartList) {
            getMyShoppingCart({ email: emailStorage, token: tokenStorage }).then(result => {
                setCartList(prev => {
                    return result.map(item => {
                        const existing = prev.find(p => p.id === item.id)
                        return existing ? { ...item, quantity: existing.quantity } : item
                    })
                })
            })
        }
    }, [emailStorage, tokenStorage, refresh])

    const handleQuantityChange = (index, type) => {
        setCartList(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1) } : item
            )
        )
    }

    const handleSelectItem = (cartId) => {
        setSelectedItem(prev =>
            prev.includes(cartId) ? prev.filter(id => id !== cartId) : [...prev, cartId])
    }

    const handleRemoveItem = () => {
        if (selectedItem.length === 0) {
            setNotifMessage(languageStorage === "en" ? "Select the product to be deleted!" : 'Pilih produk yang akan dihapus!')
            setTimeout(() => setNotifMessage(null), 2000)
            return
        }
        removeFromCart({
            cartId: selectedItem,
            token: tokenStorage,
            setNotifMessage,
            setIsAdded,
            setRefresh
        })
        setCartList(prev => prev.filter(item => !selectedItem.includes(item.id)))
        setSelectedItem([])
    }

    const handleSelectAll = () => {
        if (selectedItem.length === cartList.length) {
            setSelectedItem([])
        } else {
            setSelectedItem(cartList.map(item => item.id))
        }
    }

    const handleMaxText = (text, maxWord) => {
        if (!text) return ""

        let word = text.split(' ')

        if (word.length <= maxWord) return text
        return word.slice(0, maxWord).join(" ") + "..."
    }

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

    const formatCurrencyTotal = (num) => {
        if (num) {
            let formatted = new Intl.NumberFormat('id-ID', {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: selectedItem.length === 0 ? "0" : 3
            }).format(num)

            return formatted
        }
    }


    return (
        <BrowseLayout>
            <div className='bg-gray-200'>
                {notifMessage && <Notify message={notifMessage} style={"toast-middle"} styleMessage={"bg-black/60 flex flex-col text-2xl"} isShowIcon={selectedItem.length === 0 ? false : true} onClose={() => {
                    setNotifMessage(null)
                }} />}
                <header className='relative fixed w-full'>
                    <nav className='p-2 fixed z-50 w-full bg-indigo-500'>
                        <div className='max-w-7xl mx-auto'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-4 text-white text-sm'>
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
                                    <div className='flex gap-2'>
                                        <a href={linkedIn}>
                                            <FaLinkedin size={18} className='cursor-pointer' />
                                        </a>
                                    </div>
                                </div>
                                <div className='flex gap-3 text-white text-sm items-center'>
                                    <OptionLanguage />
                                    <AccountMenu />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className='flex fixed z-10 w-full items-center gap-4 px-6 bg-white shadow-md h-34'>
                        <div
                            className='flex items-center gap-1 cursor-pointer mt-9'
                            onClick={() => navigate('/')}
                        >
                            <div className='relative'>
                                <SiShopify
                                    size={60}
                                    className='text-indigo-500'
                                />
                                <p
                                    className='absolute top-4 left-3 font-black text-white bg-indigo-500 rotate-6 text-4xl'
                                >E</p>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <h2 className='text-indigo-500 text-3xl font-semibold font-serif'>EcoMart</h2>
                                <span className='text-2xl text-gray-300'>|</span>
                                <h3
                                    className='text-2xl text-indigo-600'>
                                    {languageStorage === "en" ? "Shopping Cart" : "Keranjang Belanja"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </header>
                <div className='relative h-auto border-b-4 border-b-indigo-600 py-8 pt-42'>
                    {cartList.length === 0 ? (
                        <div className='relative h-[400px]'>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                                <FcShop
                                    size={80}
                                    className='mx-auto'
                                />
                                <p>{languageStorage === "en" ? "Your shopping cart is empty" : "Keranjang belanja Anda kosong"}</p>
                                <button
                                    onClick={() => navigate('/browse')}
                                    className='bg-indigo-600 w-full p-2 rounded text-white text-lg mt-2 font-semibold cursor-pointer hover:bg-indigo-700 transition-all'>
                                    {languageStorage === "en" ? "Go Shopping Now" : "Belanja Sekarang"}
                                </button>
                            </div>
                        </div>
                    )
                        :
                        (
                            <div>
                                <div
                                    className='flex justify-between items-center bg-white max-w-7xl mx-auto mb-4 py-4 px-8 rounded rounded-xs'>
                                    <div className='flex items-center gap-4'>
                                        <input
                                            checked={selectedItem.length === cartList.length && cartList.length > 0}
                                            onChange={() => handleSelectAll()}
                                            type='checkbox'
                                            className='checkbox checked:bg-indigo-500 checked:text-white'
                                        />
                                        {languageStorage === "en" ? "Product" : "Produk"}
                                    </div>
                                    <div className='flex justify-between items-center gap-2 max-w-[42em] w-full'>
                                        <div>{languageStorage === "en" ? "Price" : "Harga"}</div>
                                        <div>{languageStorage === "en" ? "Quantity" : "Kuantitas"}</div>
                                        <div>{languageStorage === "en" ? "Total Price" : "Total Harga"}</div>
                                        <div>{languageStorage === "en" ? "Action" : "Aksi"}</div>
                                    </div>
                                </div>
                                <EachUtils
                                    of={cartList}
                                    render={(item, index) => (
                                        <div
                                            key={index}
                                        >
                                            <div
                                                className='flex bg-white max-w-7xl w-full mx-auto items-center justify-between py-4 px-8 rounded rounded-xs'
                                            >
                                                <div className='max-w-xs flex items-center gap-6'>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItem.includes(item?.id)}
                                                        onChange={() => handleSelectItem(item?.id)}
                                                        className="checkbox checkbox-md checked:bg-indigo-500 checked:text-white" />
                                                    <img
                                                        src={item?.image}
                                                        className='w-18'
                                                    />
                                                    <p className='text-sm'>{handleMaxText(item?.description, 10)}</p>
                                                </div>
                                                <div className='flex justify-between items-center gap-4 max-w-[43em] w-full'>
                                                    <div>{formatCurrency(item?.price)}</div>
                                                    <div className='border border-1 border-gray-300 w-24'>
                                                        <div className='flex items-center justify-between'>
                                                            <button
                                                                onClick={() => handleQuantityChange(index, "dec")}
                                                                className='w-full text-lg font-semibold hover:bg-gray-200 hover:scale-110 transition-all cursor-pointer'
                                                            >-</button>
                                                            <p className='border-gray-300 border-x-1 w-11 text-center w-full'>{item?.quantity}</p>
                                                            <button
                                                                onClick={() => handleQuantityChange(index, "inc")}
                                                                className='font-semibold text-lg w-full hover:bg-gray-200 hover:scale-110 transition-all cursor-pointer'
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                    <div>{formatCurrency(item?.price * item?.quantity)}</div>
                                                    <div
                                                        onClick={() => removeFromCart({
                                                            cartId: item?.id,
                                                            token: tokenStorage,
                                                            setNotifMessage,
                                                            setIsAdded,
                                                            setRefresh
                                                        })}
                                                        className='hover:text-red-500 cursor-pointer'
                                                    >
                                                        {languageStorage === "en" ? "Remove" : "Hapus"}</div>
                                                </div>
                                            </div>
                                            <div className='border-b-gray-300 border-b-2 max-w-7xl mx-auto' />
                                        </div>
                                    )}
                                />
                            </div>
                        )
                    }
                    <div
                        className='w-full max-w-7xl mx-auto mt-4 bg-white py-4 px-8'
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-6 items-center'>
                                <input
                                    checked={selectedItem.length === cartList.length && cartList.length > 0}
                                    onChange={handleSelectAll}
                                    type='checkbox'
                                    className='checkbox checked:bg-indigo-500 checked:text-white'
                                />
                                <p
                                    onClick={() => handleSelectAll()}
                                    className='cursor-pointer hover:underline'>
                                    {languageStorage === "en" ? "Select All " : "Pilih Semua "}
                                    ({cartList.length})
                                </p>
                                <p
                                    onClick={handleRemoveItem}
                                    className='cursor-pointer hover:underline'>
                                    {languageStorage === "en" ? "Remove" : "Hapus"}
                                </p>
                            </div>
                            <div className='flex items-center gap-6'>
                                <p>
                                    Total ({selectedItem.length} produk):
                                    <span
                                        className='text-2xl text-indigo-500 font-semibold'
                                    > {formatCurrencyTotal(selectedItem.length === 0 ? "0" : (
                                        cartList.filter(item => selectedItem.includes(item.id)).
                                            reduce((sum, item) => sum + item.price * item.quantity, 0)
                                    ))}</span>
                                </p>

                                <button
                                    onClick={() => {
                                        selectedItem.length === 0 ?
                                            setNotifMessage('Anda belum memilih produk untuk di checkout!')
                                            :
                                            addToCheckout({
                                                data: cartList.filter(item => selectedItem.includes(item.id)),
                                                token: tokenStorage,
                                                setNotifMessage
                                            })
                                    }}
                                    className='flex items-center justify-center gap-1 w-45 py-2 px-4 bg-indigo-700 text-white font-semibold cursor-pointer hover:bg-indigo-600 text-lg transition-all rounded-sm'
                                >
                                    <MdShoppingCartCheckout size={24} />
                                    {languageStorage === "en" ? "Check Out" : "Checkout"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer style={"bg-white"} />
            </div>
        </BrowseLayout>
    )
}

export default Cart