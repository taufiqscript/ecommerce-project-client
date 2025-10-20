import DefaultLayout from '@/components/layouts/DefaultLayout'
import Footer from '@/components/modules/Landing/Footer'
import Notify from '@/components/modules/Notify'
import { emailAtom, emailstorageAtom, passwordAtom, tokenStorageAtom, userIdStorageAtom } from '@/jotai/atoms'
import { apiInstanceExpress } from '@/utils/apiInstance'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { SiShopify } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
    const navigate = useNavigate()

    const [, setEmailStorage] = useAtom(emailstorageAtom)
    const [, setTokenStorage] = useAtom(tokenStorageAtom)
    const [, setUserIdStorage] = useAtom(userIdStorageAtom)

    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useAtom(passwordAtom)

    const [notifMessage, setNotifMessage] = useState(null)
    const [show, setShow] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const login = await apiInstanceExpress.post('/sign-in', {
                email,
                password
            })
            console.log({ login })
            if (login.status !== 200) return setNotifMessage("Login gagal!")

            setEmailStorage(email)
            setTokenStorage(login.data.data.token)
            setUserIdStorage(login.data.data.userId)
            setTimeout(() => {
                navigate('/browse')
            }, 2000)
        } catch (error) {
            setNotifMessage(error.response?.data?.message)
        }
    }

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const userInfo = jwtDecode(credentialResponse.credential)

            const login = await apiInstanceExpress.post('/google-login', {
                email: userInfo.email,
                name: userInfo.name,
                googleId: userInfo.sub
            })

            if (login.status === 200) {
                setEmailStorage(userInfo.email)
                setTokenStorage(login.data.data.token)
                setUserIdStorage(login.data.data.userId)
                navigate('/browse')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const screenWidth = window.innerWidth

    return (
        <DefaultLayout>
            <div className='relative'>
                <header className='relative w-full'>
                    {notifMessage && <Notify message={notifMessage} style={"toast-top"} styleMessage={"bg-black/60 flex flex-col text-[14px] sm:text-2xl"} onClose={() => setNotifMessage(null)} />}
                    <nav className='flex justify-between items-center max-w-xs sm:max-w-6xl mx-auto py-3 sm:py-6'>
                        <div className='relative flex items-center gap-1'>
                            <div 
                                onClick={() => navigate('/')}
                                className='relative flex items-center gap-1 cursor-pointer'>
                                <div className='relative'>
                                    <SiShopify
                                        className='text-blue-500 w-[35px] h-[35px] sm:w-[60px] sm:h-[60px]'
                                    />
                                    <p
                                        className='absolute top-2 sm:top-4 left-2 h-6 w-3 sm:h-10 sm:w-6 sm:left-3 font-black text-white bg-blue-500 rotate-8 sm:rotate-6 text-lg sm:text-4xl'
                                    >E</p>
                                </div>
                                <h2 className='text-blue-500 text-xs sm:text-3xl font-semibold font-serif'>EcoMart</h2>
                            </div>
                            <div className='pl-1 sm:pl-2 font-semibold text-md sm:text-2xl'>Sign In</div>
                        </div>
                        <p className='text-blue-500 text-[10px] sm:text-sm cursor-pointer'>Need Help?</p>
                    </nav>
                </header>
                <div className='relative bg-blue-500 h-[550px] sm:h-[650px] shadow-md'>
                    <div className='absolute top-1/2 -translate-1/2 left-1/2 -translate-x-1/2 flex gap-12 sm:gap-32 items-center max-w-sm sm:max-w-7xl w-full justify-center'>
                        <div className='relative flex flex-col items-center gap-1'>
                            <div className='relative'>
                                <SiShopify
                                    className='text-white text-[85px] sm:text-[150px]'
                                />
                                <p
                                    className='absolute top-5 sm:top-10 left-4 sm:left-8 font-black text-blue-500 bg-white rotate-7 sm:rotate-6 text-6xl sm:text-8xl rounded-full'
                                >E</p>
                            </div>
                            <h2 className='text-white text-lg sm:text-5xl font-semibold font-serif'>EcoMart</h2>
                            <p className='text-white text-[8px] sm:text-2xl sm:mt-4 font-semibold'>Lebih Hemat Lebih Cepat</p>
                        </div>
                        <form
                            className='bg-white p-4 sm:p-8 rounded-md w-[200px] h-[250px] sm:w-[26em] sm:h-[430px]'
                        >
                            <h3 className='font-semibold text-xs sm:text-2xl'>Sign In</h3>
                            <div className='flex flex-col gap-3 sm:gap-4 mt-3 sm:mt-6 '>
                                <input
                                    placeholder='Email'
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full text-[10px] sm:text-lg border border-gray-300 rounded px-1 sm:px-2 py-1.5 sm:py-3 shadow-md'
                                />
                                <div className='relative'>
                                <input
                                        placeholder='Password'
                                        type={show ? 'text' : 'password'}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className='relative w-full text-[10px] sm:text-lg border border-gray-300 rounded px-1 sm:px-2 py-1.5 sm:py-3 shadow-md'
                                        autoComplete='current-password'
                                        aria-label='Password'
                                />
                                    <button
                                        type='button'
                                        onClick={() => setShow(!show)}
                                        aria-pressed={show}
                                        aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
                                        className='absolute top-1/2 -translate-y-1/2 sm:right-4 right-2 cursor-pointer text-gray-400 sm:text-[18px] text-[10px]'
                                    >
                                        {show ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className='w-full bg-blue-500 text-white text-xs sm:text-xl font-bold text-center py-1.5 sm:py-3 rounded cursor-pointer hover:bg-blue-600 transition-all'
                                >
                                    Login
                                </button>
                                <div className='flex items-center'>
                                    <div className='flex-grow border-t border-gray-300' />
                                    <div className='flex-grow border-t border-gray-300' />
                                </div>
                                <div className='mx-auto sm:w-auto w-35'>
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => console.log('Google login failed!')}
                                        size={screenWidth < 640 ? 'small' : 'large'}
                                    />
                                </div>
                                <p className='text-[8px] sm:text-[14px] mt-2 m-auto'>
                                    New to EcoMart?
                                    <span
                                        className='ml-1 hover:text-indigo-500 hover:underline cursor-pointer'
                                        onClick={() => navigate('/register')}
                                    >Sign Up</span>
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

export default Login