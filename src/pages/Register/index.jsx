import React, { useState } from 'react'
import { SiShopify } from 'react-icons/si'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import Footer from '@/components/modules/Landing/Footer'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { useAtom } from 'jotai'
import { emailAtom, passwordAtom } from '@/jotai/atoms'
import Notify from '@/components/modules/Notify'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const Register = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useAtom(passwordAtom)

    const [notifMessage, setNotifMessage] = useState(null)

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const register = await apiInstanceExpress.post('/sign-up', {
                email,
                password
            })

            if (register.status !== 201) return setNotifMessage("Register gagal!")

            setNotifMessage('Register success')
            setTimeout(() => {
                setNotifMessage(null)
                navigate('/login')
            }, 3000)

        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    const handleGoogleSignUp = async (credentialResponse) => {
        try {
            const userInfo = jwtDecode(credentialResponse.credential)
            console.log(userInfo)
            const signup = await apiInstanceExpress.post('/google-login', {
                email: userInfo.email,
                name: userInfo.name,
                googleId: userInfo.sub
            })

            if (signup.status !== 200) return setNotifMessage('Error, failed sign-up!')

            setNotifMessage('Register berhasil')
            setTimeout(() => navigate('/login'), 2000)

        } catch (error) {
            console.log(error)
        }
    }

    const screenWidth = window.innerWidth

    return (
        <DefaultLayout>
            <div className='relative'>
                {notifMessage && <Notify message={notifMessage} style={"toast-top"} styleMessage={'bg-black'} onClose={() => setNotifMessage(null)} />}
                <header className='relative w-full'>
                    <nav className='flex justify-between items-center max-w-xs sm:max-w-6xl mx-auto py-3 sm:py-6'>
                        <div className='relative flex items-center gap-1'>
                            <div 
                                onClick={() => navigate('/')}
                                className='relative flex items-center gap-1'>
                                <div className='relative'>
                                    <SiShopify
                                        className='text-indigo-500 w-[35px] h-[35px] sm:w-[60px] sm:h-[60px]'
                                    />
                                    <p
                                        className='absolute top-2 sm:top-4 left-2 h-6 w-3 sm:h-10 sm:w-6 sm:left-3 font-black text-white bg-indigo-500 rotate-8 sm:rotate-6 text-lg sm:text-4xl'
                                    >E</p>
                                </div>
                                <h2 className='text-blue-500 text-xs sm:text-3xl font-semibold font-serif'>EcoMart</h2>
                            </div>
                            <div className='pl-1 sm:pl-2 font-semibold text-md sm:text-2xl'>Sign Up</div>
                        </div>
                        <p className='text-blue-500 text-[10px] sm:text-sm cursor-pointer'>Need Help?</p>
                    </nav>
                </header>
                <div className='relative bg-indigo-500 h-[325px] sm:h-[650px] shadow-md'>
                    <div className='absolute top-1/2 -translate-1/2 left-1/2 -translate-x-1/2 flex gap-12 sm:gap-32 items-center max-w-sm sm:max-w-7xl w-full justify-center'>
                        <div className='relative flex flex-col items-center gap-1'>
                            <div className='relative'>
                                <SiShopify
                                    className='text-white text-[85px] sm:text-[150px]'
                                />
                                <p
                                    className='absolute top-5 sm:top-10 left-4 sm:left-8 font-black text-indigo-500 bg-white rotate-7 sm:rotate-6 text-6xl sm:text-8xl rounded-full'
                                >E</p>
                            </div>
                            <h2 className='text-white text-lg sm:text-5xl font-semibold font-serif'>EcoMart</h2>
                            <p className='text-white text-[8px] sm:text-2xl sm:mt-4 font-semibold'>Lebih Hemat Lebih Cepat</p>
                        </div>
                        <form
                            className='bg-white p-4 sm:p-8 rounded-md w-[200px] h-[216px] sm:w-[26em] sm:h-[430px]'
                        >
                            <h3 className='font-semibold text-xs sm:text-2xl'>Sign Up</h3>
                            <div className='flex flex-col gap-2 sm:gap-4 mt-3 sm:mt-6 '>
                                <input
                                    placeholder='Email'
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full text-[10px] sm:text-lg border border-gray-300 rounded px-1 sm:px-2 py-1.5 sm:py-3 shadow-md'
                                />
                                <input
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full text-[10px] sm:text-lg border border-gray-300 rounded px-1 sm:px-2 py-1.5 sm:py-3 shadow-md'
                                />
                                <button
                                    onClick={handleRegister}
                                    className='w-full bg-indigo-500 text-white text-xs sm:text-xl font-bold text-center py-1.5 sm:py-3 rounded cursor-pointer hover:bg-indigo-600 transition-all'
                                >
                                    Sign Up
                                </button>
                                <div className='flex items-center'>
                                    <div className='flex-grow border-t border-gray-300' />
                                    <div className='flex-grow border-t border-gray-300' />
                                </div>
                                <div className='mx-auto sm:w-auto w-35'>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignUp}
                                        onError={() => console.log('Failed google signup!')}
                                        size={screenWidth < 640 ? 'small' : 'large'}
                                    />
                                </div>
                                <p className='text-[8px] sm:mt-2 m-auto'>
                                    Have An Account?
                                    <span
                                        className='ml-1 hover:text-indigo-500 hover:underline cursor-pointer'
                                        onClick={() => navigate('/login')}
                                    >Login</span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        </DefaultLayout>
    )
}

export default Register