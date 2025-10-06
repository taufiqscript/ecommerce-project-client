import { LIST_FOOTER_1_EN, LIST_FOOTER_1_ID, LIST_FOOTER_2_EN, LIST_FOOTER_2_ID, LIST_FOOTER_3_EN, LIST_FOOTER_3_ID, LIST_FOOTER_4_EN, LIST_FOOTER_4_ID } from '@/constans/listFooter'
import { languageStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { useAtom } from 'jotai'
import React from 'react'
import { FaInstagramSquare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { IoLogoGooglePlaystore, IoLogoApple } from 'react-icons/io5'
import { SiAppgallery } from 'react-icons/si'

const Footer = ({ style }) => {
    const [languageStorage] = useAtom(languageStorageAtom)

    return (
        <footer className={`py-5 px-6 sm:py-10 sm:px-12 h-full ${style}`}>
            <div className='flex items-start gap-1 sm:gap-[11em] text-sm'>
                <div className='flex flex-col sm:gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_1_EN : LIST_FOOTER_1_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='text-[10px] sm:text-[14px] font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 text-[8px] sm:text-[14px] hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col sm:gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_2_EN : LIST_FOOTER_2_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='text-[10px] sm:text-[14px] font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 text-[8px] sm:text-[14px] hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col sm:gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_3_EN : LIST_FOOTER_3_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='text-[10px] sm:text-[14px] font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 text-[8px] sm:text-[14px] hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col h-auto gap-0.5 sm:gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_4_EN : LIST_FOOTER_4_ID}
                        render={(item, index) => (
                            <div key={index} >
                                <h3 className='pt-1 sm:pt-0 text-[10px] sm:text-[14px] font-bold'>{item.name}</h3>
                                <div>
                                    <a
                                        href={item.url}
                                        className='flex items-center hover:text-indigo-500 text-[8px] sm:text-[14px] hover:underline gap-1'
                                    >
                                        <span>
                                            {
                                                index === 1 && <FaInstagramSquare /> ||
                                                index === 2 && <FaFacebook /> ||
                                                index === 3 && <FaTwitter /> ||
                                                index === 4 && <FaLinkedin />
                                            }
                                        </span>
                                        <div className='hover:text-indigo-500 hover:underline text-[8px] sm:text-[14px]'>
                                            {item.title}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-2.5 pl-2 sm:pl-0 sm:gap-4'>
                    <h3
                        className='text-[10px] sm:text-[14px] font-bold'
                    >{languageStorage === "en" ? "Download App" : "Download Aplikasi"}</h3>
                    <div className='flex text-[8px] sm:text-sm w-[70px] sm:w-full items-center gap-1 bg-white p-1 sm:p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <IoLogoApple className='text-xs sm:text-2xl' />
                        App Store
                    </div>
                    <div className='flex text-[8px] sm:text-sm w-[70px] sm:w-full items-center gap-1 bg-white p-1 sm:p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <IoLogoGooglePlaystore className='text-xs sm:text-2xl' />
                        Google Play
                    </div>
                    <div className='flex text-[8px] sm:text-sm w-[70px] sm:w-full items-center gap-1 bg-white p-1 sm:p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <SiAppgallery
                            className='text-xs sm:text-2xl text-red-600'
                        />
                        AppGallery
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer