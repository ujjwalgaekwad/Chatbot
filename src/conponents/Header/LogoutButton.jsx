import React from 'react'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import {Button} from '../index'

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.Logout().then(() => {
      dispatch(logout());
    })
  }

  return (
    // <button onClick={logoutHandler} className='px-8 py-2.5 border-2 border-gray-400 rounded-md'>Logout</button>
    <Button onClick={logoutHandler} className='border-[#505050] border-2 bg-transparent text-gray-200 hover:bg-[#404040]'>Logout</Button>
  )
}

export default LogoutButton
