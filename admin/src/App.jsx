
import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Bookings from './pages/Bookings'
import Login from './components/Login'
import Update from './pages/Update' 
import { ToastContainer } from 'react-toastify';
import Reports from './pages/Reports'
import UserList from './pages/UserList'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        :
        <>
          <NavBar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/bookings' element={<Bookings token={token} />} />
                <Route path='/update' element={<Update token={token} />} />
                <Route path="/reports" element={<Reports token={token} />} />
                <Route path="/users" element={<UserList token={token} />} />
                              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
