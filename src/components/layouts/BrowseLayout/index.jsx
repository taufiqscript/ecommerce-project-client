import { emailstorageAtom, tokenStorageAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const BrowseLayout = ({ children }) => {
    const navigate = useNavigate()

    const [emailStorage] = useAtom(emailstorageAtom)
    const [tokenStorage] = useAtom(tokenStorageAtom)

    return (
        <div>
            <div className='bg-gray-100'>
                {!emailStorage && !tokenStorage ? navigate('/') : children}
            </div>
        </div>
    )
}

export default BrowseLayout