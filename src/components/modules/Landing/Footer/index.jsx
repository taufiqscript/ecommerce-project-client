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
        <footer className={`py-10 px-12 ${style}`}>
            <div className='flex items-start gap-[11em] text-sm'>
                <div className='flex flex-col gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_1_EN : LIST_FOOTER_1_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_2_EN : LIST_FOOTER_2_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_3_EN : LIST_FOOTER_3_ID}
                        render={(item, index) => (
                            <div key={index}>
                                <h3 className='font-bold'>{item.name}</h3>
                                <a
                                    href={item.url}
                                    className='hover:text-indigo-500 hover:underline'
                                >{item.title}</a>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <EachUtils
                        of={languageStorage === "en" ? LIST_FOOTER_4_EN : LIST_FOOTER_4_ID}
                        render={(item, index) => (
                            <div key={index} >
                                <h3 className='font-bold'>{item.name}</h3>
                                <div>
                                    <a
                                        href={item.url}
                                        className='flex items-center gap-1'
                                    >
                                        <span>
                                            {
                                                index === 1 && <FaInstagramSquare /> ||
                                                index === 2 && <FaFacebook /> ||
                                                index === 3 && <FaTwitter /> ||
                                                index === 4 && <FaLinkedin />
                                            }
                                        </span>
                                        <div className='hover:text-indigo-500 hover:underline'>
                                            {item.title}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <h3
                        className='font-bold'
                    >{languageStorage === "en" ? "Download App" : "Download Aplikasi"}</h3>
                    <div className='flex items-center gap-1 bg-white p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <IoLogoApple size={20} />
                        App Store
                    </div>
                    <div className='flex items-center gap-1 bg-white p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <IoLogoGooglePlaystore size={20} />
                        Google Play
                    </div>
                    <div className='flex items-center gap-1 bg-white p-2 rounded-md font-bold cursor-pointer hover:bg-gray-200 transition-all shadow-md'>
                        <SiAppgallery
                            size={18}
                            className='text-red-600'
                        />
                        AppGallery
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer