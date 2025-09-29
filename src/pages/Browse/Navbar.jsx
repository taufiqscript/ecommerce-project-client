import AccountMenu from '@/components/modules/Browse/AccountMenu'
import OptionLanguage from '@/components/modules/Landing/OptionLanguage'
import SearchInput from '@/components/modules/Landing/SearchInpnut'
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from '@/constans/listNavbar'
import { languageStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const [languageStorage] = useAtom(languageStorageAtom)

    const linkedIn = "https://www.linkedin.com/in/taufiq-rahman-98a322356"

    return (
        <header className='relative w-full'>
            <nav className='p-2 fixed z-50 w-full bg-indigo-500'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex justify-between items-center'>
                        <div className='flex sm:gap-3 text-white text-xs sm:text-sm items-center'>
                            <EachUtils
                                of={languageStorage === "en" ? LIST_NAVBAR_EN : LIST_NAVBAR_ID}
                                render={(item, index) => (
                                    <div
                                        key={index}
                                    >
                                        <a
                                            className='hover:underline hover:text-gray-200 cursor-pointer'
                                            href={item.url}
                                        >{item.title}</a>
                                    </div>
                                )}
                            />
                            <div className='flex gap-2'>
                                <a
                                    href={linkedIn}
                                >
                                    <FaLinkedin
                                        size={18}
                                        className='cursor-pointer' />
                                </a>
                            </div>
                        </div>
                        <div className='flex gap-3 text-white text-sm items-center'>
                            <OptionLanguage />
                            <AccountMenu />
                        </div>
                    </div>
                    <div className='relative mt-3 flex justify-between items-center max-w-6xl mx-auto'>
                        <div className='relative flex items-center gap-1'>
                            <div className='relative'>
                                <SiShopify
                                    size={60}
                                    className='text-white'
                                />
                                <p
                                    className='absolute top-4 left-3 font-black text-indigo-500 bg-white rotate-6 text-4xl'
                                >E</p>
                            </div>
                            <h2 className='text-white text-3xl font-semibold font-serif'>EcoMart</h2>
                        </div>
                        <div>
                            <SearchInput />
                        </div>
                        <div>
                            <HiOutlineShoppingCart
                                size={28}
                                className='text-white cursor-pointer hover:text-gray-200'
                                onClick={() => navigate('/cart')}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar