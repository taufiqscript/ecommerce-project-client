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

    return (
        <DefaultLayout>
            <div className='relative'>
                {notifMessage && <Notify message={notifMessage} style={"toast-top"} styleMessage={'bg-black'} onClose={() => setNotifMessage(null)} />}
                <header className='relative w-full'>
                    <nav className='flex justify-between items-center max-w-6xl mx-auto py-6'>
                        <div className='relative flex items-center gap-1'>
                            <div
                                className='flex items-center gap-1 cursor-pointer'
                                onClick={() => navigate('/')}
                            >
                                <div className='relative'>
                                    <SiShopify
                                        size={60}
                                        className='text-indigo-500'
                                    />
                                    <p
                                        className='absolute top-4 left-3 font-black text-white bg-indigo-500 rotate-6 text-4xl'
                                    >E</p>
                                </div>
                                <h2 className='text-indigo-500 text-3xl font-semibold font-serif'>EcoMart</h2>
                            </div>
                            <div className='pl-2 font-semibold text-2xl'>Sign Up</div>
                        </div>
                        <p className='text-blue-500 text-sm cursor-pointer'>Need Help?</p>
                    </nav>
                </header>
                <div className='relative bg-indigo-500 h-[650px] shadow-md'>
                    <div className='absolute top-1/2 -translate-1/2 left-1/2 -translate-x-1/2 flex gap-32 items-center  max-w-7xl w-full justify-center'>
                        <div className='relative flex flex-col items-center gap-1'>
                            <div className='relative'>
                                <SiShopify
                                    size={150}
                                    className='text-white'
                                />
                                <p
                                    className='absolute top-10 left-8 font-black text-indigo-500 bg-white rotate-6 text-8xl'
                                >E</p>
                            </div>
                            <h2 className='text-white text-5xl font-semibold font-serif'>EcoMart</h2>
                            <p className='text-white text-2xl mt-4 font-semibold'>Lebih Hemat Lebih Cepat</p>
                        </div>
                        <form
                            className='bg-white p-8 rounded-md w-[26em]'
                        >
                            <h3 className='font-semibold text-xl'>Sign Up</h3>
                            <div className='flex flex-col gap-4 mt-6 '>
                                <input
                                    placeholder='Email'
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-80 border border-gray-300 rounded px-2 py-3 shadow-md w-full'
                                />
                                <input
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-80 border border-gray-300 rounded px-2 py-3 shadow-md w-full'
                                />
                                <button
                                    onClick={handleRegister}
                                    className='w-full bg-indigo-500 text-white text-xl font-bold text-center py-3 rounded cursor-pointer hover:bg-indigo-600 transition-all'
                                >
                                    Sign Up
                                </button>
                                <div className='flex items-center'>
                                    <div className='flex-grow border-t border-gray-300' />
                                    <div className='flex-grow border-t border-gray-300' />
                                </div>
                                <div className='mx-auto w-auto'>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSignUp}
                                        onError={() => console.log('Failed google signup!')}
                                    />
                                </div>
                                <p className='mt-2 m-auto'>
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