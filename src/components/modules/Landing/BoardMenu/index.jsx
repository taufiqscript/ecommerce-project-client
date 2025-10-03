import React from 'react'
import { motion } from 'framer-motion'

const BoardMenu = () => {

    return (
        <div className='relative w-full pt-17 sm:pt-30 bg-white'>
            <div className='max-w-7xl mx-auto flex flex-col p-2 sm:p-6 gap-6'>
                <div className='flex items-center gap-1 h-[180px] sm:h-[60vh]'>
                    <motion.img
                        initial={{ x: "-100vw" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                        src='/iklan 2.png'
                        className='object-cover w-[180px] h-[170px] sm:w-[52em] sm:h-full transition-all '
                    />
                    <motion.img
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                        src='/iklan 1.png'
                        className='object-cover w-[175px] h-[170px] sm:h-full sm:w-full sm:max-w-md transition-all'
                    />
                </div>
            </div>
        </div>
    )
}

export default BoardMenu