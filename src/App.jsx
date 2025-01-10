import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import { Outlet } from 'react-router';
import './App.css'
import Header from './conponents/Header/Header'

function App() {
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.userStatus().then((status) => {
      // dispatch(login({status}))
      if (status) {
        dispatch(login({ status }))
      } else {
        dispatch(logout())
      }
    }).finally(() => setLoading(false))
  }, [])

  return !Loading ? (
    <div className='min-h-screen flex flex-wrap content-between text-white bg-[#212121]'>
      <div className='w-full block'>
        <Header />
        <main>
          {<Outlet />}
        </main>
      </div>
    </div>  //add tailwindcss and some features
  ) : null;
}

export default App
