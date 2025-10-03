import CarouselLayout from '@/components/layouts/CarouselLayout'
import { dataProductAtom, idProductAtom, isOpenModalAtom, languageStorageAtom } from '@/jotai/atoms'
import EachUtils from '@/utils/EachUtils'
import { getListCategory } from '@/utils/getListCategory'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const CategoryMenu = () => {
    const loc = useLocation()

    const [languageStorage] = useAtom(languageStorageAtom)
    const [, setIsOpenModal] = useAtom(isOpenModalAtom)
    const [, setIdProduct] = useAtom(idProductAtom)
    const [, setData] = useAtom(dataProductAtom)

    const [product, setProduct] = useState([])


    useEffect(() => {
        getListCategory({ products: "products" }).then(result => setProduct(result))
    }, [])

    return (
        <div className='relative mx-2 sm:mx-12 my-4 bg-white h-[350px] sm:h-[390px]'>
            <h3 className='p-2 sm:p-5 text-[15px] sm:text-2xl font-semibold text-gray-500'>{languageStorage === "en" ? "Product" : "Produk"}</h3>
            <CarouselLayout>
                <EachUtils
                    of={product}
                    render={(item, index) => (
                        <div key={index} className='w-28 sm:w-40'>
                            <div
                                className='relative h-[156px] sm:h-[160px] border border-gray-300 w-[112px] sm:w-full object-cover cursor-pointer  hover:shadow-xl transition-all'
                                onClick={() => loc.pathname === '/browse' ? (
                                    setIdProduct(item.id),
                                    setData(item),
                                    setIsOpenModal(true)
                                )
                                    :
                                    location.replace('/login')}
                            >
                                <img
                                    src={item.image}
                                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 z-10'
                                />
                                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-full p-4 sm:p-8 h-[13vh] w-[13vh]' />
                                <p
                                    className='absolute bottom-1 sm:bottom-3 left-1/2 -translate-x-1/2 text-[10px] sm:text-sm text-center w-28'
                                >{item.category}</p>
                            </div>
                        </div>
                    )}
                />
            </CarouselLayout>
        </div>
    )
}

export default CategoryMenu