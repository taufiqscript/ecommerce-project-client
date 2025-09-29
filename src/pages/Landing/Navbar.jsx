import OptionLanguage from '@/components/modules/Landing/OptionLanguage'
import SearchInput from '@/components/modules/Landing/SearchInpnut'
import UserMenu from '@/components/modules/Landing/UserMenu'
import { LIST_NAVBAR_EN, LIST_NAVBAR_ID } from '@/constans/listNavbar'
import { languageStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { SiShopify } from 'react-icons/si'

const Navbar = () => {
    const [languageStorage] = useAtom(languageStorageAtom)

    return (
        <header className='relative w-full'>
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
                        </div>
                        <div className='flex gap-4 text-white text-sm items-center'>
                            <OptionLanguage />
                            <UserMenu />
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
                                onClick={() => location.replace('/login')}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar