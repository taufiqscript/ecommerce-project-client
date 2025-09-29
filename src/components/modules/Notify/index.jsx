import React, { useEffect } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

const Notify = ({
    message,
    style,
    styleMessage,
    onClose,
    isShowIcon = false
}) => {

    useEffect(() => {
        if (message && onClose) {
            const timer = setTimeout(() => {
                onClose()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [message, onClose])

    if (!message) return null

    return (
        <div className='relative z-50'>
            <div className={`toast toast-center ${style}`}>
                <div className={`alert text-white border-none ${styleMessage}`}>
                    {isShowIcon && (
                        <FaCircleCheck
                            size={42}
                            className='text-green-300 rounded-full bg-white'
                        />
                    )}
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

export default Notify