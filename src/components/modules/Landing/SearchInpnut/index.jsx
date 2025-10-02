import { LIST_SEARCH } from '@/constans/listNavbar'
import { languageStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const SearchInput = () => {
    const [languageStorage] = useAtom(languageStorageAtom)

    return (
        <div className='relative'>
            <div className='relative'>
                <input
                    placeholder={languageStorage === "en" ? "Search Product" : "Cari Produk"}
                    className='bg-white text-[8px] sm:text-lg rounded p-1 sm:p-2 w-[180px] sm:w-4xl'
                />
                <div
                    className='absolute top-[15px] sm:top-1/2 -translate-y-1/2 right-1 bg-indigo-500 py-0.5 sm:py-2 px-2 sm:px-5 rounded cursor-pointer'
                >
                    <HiMagnifyingGlass
                        className='text-white text-[10px] sm:text-xl'
                    />
                </div>
            </div>
            <div className='flex gap-1 sm:gap-6 text-white hidden sm:text-xs mt-2'>
                <EachUtils
                    of={LIST_SEARCH}
                    render={(item, index) => (
                        <a
                            key={index}
                            href={item.url}
                            className='hover:text-gray-200 hover:underline cursor-pointer'
                        >
                            {item.title}
                        </a>
                    )}
                />
            </div>
        </div>
    )
}

export default SearchInput