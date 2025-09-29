import React, { useRef, useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

const CarouselLayout = ({ children }) => {
    const ref = useRef()

    const [isHover, setIsHover] = useState(false)

    const handleScroll = (offset) => {
        ref.current.scrollLeft += offset
    }

    return (
        <div
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className='relative w-full'>
            <button
                className='absolute top-1/2 -translate-y-1/2 left-0 z-50'
                onClick={() => handleScroll(-500)}
            >
                <GoChevronLeft
                    size={26}
                    className={`text-black cursor-pointer border rounded-full bg-white border-none ${isHover ? "scale-180" : "scale-100"} shadow-xl transition-all`}
                />
            </button>
            <button
                className='absolute top-1/2 -translate-y-1/2 right-0 z-50'
                onClick={() => handleScroll(500)}
            >
                <GoChevronRight
                    size={26}
                    className={`text-black cursor-pointer border rounded-full bg-white border-none ${isHover ? "scale-180" : "scale-100"} shadow-xl transition-all`}
                />
            </button>
            <div
                className='carousel scroll-smooth w-full overflow-x-auto'
                ref={ref}
            >
                <div className='grid grid-rows-2 grid-flow-col'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CarouselLayout