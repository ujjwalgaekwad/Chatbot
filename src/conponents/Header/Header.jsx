import React from 'react'
import { Container, LogoutButton } from '../index';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from '../index';
import {AlignJustify} from 'lucide-react'


function Header() {
    const userStatus = useSelector((state) => state.auth.status)

    const navigate = useNavigate()

    const navLinks = [
        // {
        //     name: 'home',
        //     slug: '/',
        //     active: true
        // },
        {
            name: 'login',
            slug: '/login',
            active: !userStatus
        },
        // {
        //     name: 'signup',
        //     slug: '/signup',
        //     active: !userStatus
        // }
    ]

    return (
        <header className='h-16 text-gray-200'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div className='flex justify-center items-center'>
                        <Link to='/'>
                            <img className='h-10 rounded-lg' src='/robot-chat.jpg' alt="" />
                        </Link>
                        <h1 className='hidden md:block ml-3 text-2xl text-gray-300 font-bold'>AuraChat</h1>
                    </div>
                    <ul className=''>
                        {navLinks.map((link) =>
                            link.active ? (
                                <li key={link.name} className='text-[16px]'>
                                    {/* <button className='border-none hover:text-gray-300 bg-blue-' onClick={() => navigate(link.slug)}>{link.name}</button> */}
                                    <Link to='/signup'>
                                        <Button  onclick={() => navigate(link.slug)} className='px-4 py-1.5 rounded-lg bg-[#404040] text-white hidden md:block'>Sign up</Button>
                                        <AlignJustify strokeWidth={1.25} className='md:hidden' />
                                    </Link>
                                </li>
                            ) : null
                        )}
                        {userStatus && (
                            <li>
                                <LogoutButton />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
