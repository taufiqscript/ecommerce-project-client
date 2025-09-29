import { languageStorageAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserMenu = () => {
  const navigate = useNavigate()

  const [languageStorage] = useAtom(languageStorageAtom)

  return (
    <div>
      <ul className='flex items-center gap-2'>
        <li
          className='hover:text-gray-200 cursor-pointer'
          onClick={() => navigate('/register')}
        >
          {languageStorage === "en" ? "Sign Up" : "Daftar"}</li>
        <li>|</li>
        <li
          className='hover:text-gray-200 cursor-pointer'
          onClick={() => navigate('/login')}
        >{languageStorage === "en" ? "Login" : "Masuk"}</li>
      </ul>
    </div >
  )
}

export default UserMenu