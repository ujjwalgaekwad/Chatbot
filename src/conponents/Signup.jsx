import React, { useState, useEffect, useId } from 'react'
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Input, Button } from './index'
import { useForm } from 'react-hook-form';
import { login } from '../features/authSlice';
import { Link } from 'react-router';

function Signup() {
    const [isError, setIsError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useId();
    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();

    const signup = async (data) => {
        setIsError('');
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userStatus = await authService.userStatus();
                if (userStatus) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            console.log("Singup-components-error:", error);
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full p-10'
        >
            <div className={`mx-auto w-full max-w-sm md:max-w-md border-2 rounded-xl p-12 md:p-14 border-[#303030]`}>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up</h2>
                <form onSubmit={handleSubmit(signup)}>
                    <div>
                        <Input
                            placeholder="Enter Name"
                            type='text'
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className='text-red-600'>Enter your name</span>}
                        <Input

                            placeholder='Email address'
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        {errors.email && <p className='text-red-600'>Email address must be a valid address</p>}
                        <Input

                            placeholder="password"
                            type="Password"
                            {...register("password",
                                {
                                    required: true,
                                    min: { value: 8, message: "Password must be 8 characters" }
                                })}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                        {errors.password && <p className='text-red-600'>Enter password</p>}
                        <Button
                            type="submit"
                            className='w-full'
                            children={"Create an account"}
                        >
                            {isSubmitting ? "Creating" : "Create an account"}
                        </Button>
                    </div>
                </form>
                <p className='text-gray-200 mt-3 text-center'>Already have an account? <Link to='/login'><span className='hover:text-gray-400 underline transition-all ease-in duration-200'>Sign in</span></Link></p>
                {isError && <p className="text-red-500 mt-8 text-center">{isError}</p>}
            </div>
        </div>
    )
}

export default Signup
