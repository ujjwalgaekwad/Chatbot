import React, { useState, useId } from 'react'
import { useForm } from 'react-hook-form'
import { login as featureLogin } from '../features/authSlice'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Input, Button } from './index';

function Login() {
    const [isError, setIsError] = useState('');
    const id = useId()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();

    const login = async (data) => {
        setIsError('');
        try {
            const session = await authService.Login(data);
            if (session) {
                const userStatus = await authService.userStatus();
                if (userStatus) {
                    dispatch(featureLogin(session)); //..??
                    navigate("/");
                }
            }
        } catch (error) {
            setIsError(error.message);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full p-10'
        >
            <div className={`mx-auto w-full max-w-[auto] md:max-w-md border-2 rounded-xl p-16 md:p-12 border-[#303030]`}>
                <h2 className="text-center text-2xl font-bold leading-tight mb-6">Login to your account</h2>
                {isError && <p className="text-red-600 mt-8 text-center">{isError}</p>}

                <form onSubmit={handleSubmit(login)}>
                    <div>
                        <Input
                            placeholder='Email address'
                            type='email'
                            {...register('email',
                                {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }

                                })}
                        />
                        {errors.email && <p className='text-red-500'> Please enter valid email address</p>}
                        <Input
                            placeholder='password'
                            type='password'
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className='text-red-500'> Check Password</p>}
                        <Button
                            children={'Sign in'}
                            type='submit'
                            className='w-full'
                        >{isSubmitting ? "Loading..." : "Sign in"}</Button>
                    </div>
                </form>
                <p className='text-gray-200 mt-3 text-center'>Don't have an account? <Link to='/signup'><span className='hover:text-gray-400 underline transition-all ease-in duration-200'>Sign up</span></Link></p>

            </div>
        </div>
    )
}

export default Login
