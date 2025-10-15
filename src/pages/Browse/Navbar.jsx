import AccountMenu from '@/components/modules/Browse/AccountMenu'
import OptionLanguage from '@/components/modules/Landing/OptionLanguage'
import SearchInput from '@/components/modules/Landing/SearchInpnut'
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from '@/constans/listNavbar'
import { cartListStorageAtom, emailstorageAtom, languageStorageAtom, refreshAtom, tokenStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { getMyShoppingCart } from '@/utils/getMyShoppingCart'
import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const [emailStorage] = useAtom(emailstorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)
    const [languageStorage] = useAtom(languageStorageAtom)
    const [cartlist, setCartList] = useAtom(cartListStorageAtom)

    const [refresh] = useAtom(refreshAtom)

    useEffect(() => {
        if (emailStorage && tokenStorage && cartlist) {
            getMyShoppingCart({
                email: emailStorage,
                token: tokenStorage
            }).then(result => setCartList(result))
        }
    }, [emailStorage, tokenStorage, cartlist, refresh])

    const linkedIn = "https://www.linkedin.com/in/taufiq-rahman-98a322356"

    return (
        <header className='relative w-full'>
            <nav className='p-1 sm:p-2 fixed z-50 w-full bg-blue-500'>
                <div className='max-w-sm sm:max-w-7xl mx-auto'>
                    <div className='flex gap-2 justify-between items-center'>
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
                    <div className='relative mt-3 flex items-center justify-between items-center max-w-xs sm:max-w-6xl mx-auto'>
                        <div className='relative flex items-center gap-1'>
                            <div className='relative'>
                                <SiShopify
                                    className='text-white w-[35px] h-[35px] sm:w-[60px] sm:h-[60px]'
                                />
                                <p
                                    className='absolute top-2 sm:top-4 left-2 h-6 w-3 sm:h-10 sm:w-6 sm:left-3 font-black text-blue-500 bg-white rotate-8 sm:rotate-6 text-lg sm:text-4xl'
                                >E</p>
                            </div>
                            <h2 className='text-white text-xs sm:text-3xl font-semibold font-serif'>EcoMart</h2>
                        </div>
                        <div>
                            <SearchInput />
                        </div>
                        <div className='relative'>
                            <HiOutlineShoppingCart
                                className='relative text-white text-md sm:text-3xl cursor-pointer hover:text-gray-200'
                                onClick={() => navigate('/cart')}
                            />
                            <div className='absolute bottom-[1px] right-0 p-0.5 bg-red-500 text-white rounded text-center w-4 h-4 font-bold text-[10px]'>
                                {cartlist?.length}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar