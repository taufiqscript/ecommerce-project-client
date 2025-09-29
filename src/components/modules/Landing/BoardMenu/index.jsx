import React from 'react'
import { motion } from 'framer-motion'

const BoardMenu = () => {

    return (
        <div className='relative w-full pt-30 bg-white'>
            <div className='max-w-7xl mx-auto flex flex-col p-6 gap-6'>
                <div className='sm:flex items-center gap-2 h-[60vh]'>
                    <motion.img
                        initial={{ x: "-100vw" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                        src='/iklan 2.png'
                        className='object-cover w-[52em] h-full transition-all'
                    />
                    <motion.img
                        initial={{ x: "100vw" }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                        src='/iklan 1.png'
                        className='object-cover h-full max-w-md transition-all'
                    />
                </div>
            </div>
        </div>
    )
}

export default BoardMenu