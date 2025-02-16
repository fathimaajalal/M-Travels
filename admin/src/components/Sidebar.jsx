import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/add">
          <img className='w-5 h-5' src={assets.add_icon} alt="" />
          <p className='hidden md:block'>Add Items</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/list">
          <img className='w-5 h-5' src={assets.list_icon} alt="" />
          <p className='hidden md:block'>List Vehicles</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/update">
          <img className='w-5 h-5' src={assets.update_icon} alt="" />
          <p className='hidden md:block'>Update Vehicles</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/bookings">
          <img className='w-5 h-5' src={assets.book_icon} alt="" />
          <p className='hidden md:block'>Bookings</p>
        </NavLink>

        {/* Add Newsletter Option */}
        {/* <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/send-newsletter">
          <img className='w-5 h-5' src={assets.email_icon} alt="" /> {/* Add an email icon to assets */}
          {/* <p className='hidden md:block'>Send Newsletter</p>
        </NavLink> */} 

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/users">
          <img className='w-5 h-5' src={assets.profile_icon} alt="" />
          <p className='hidden md:block'>Users</p>
        </NavLink>

        <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' to="/reports">
          <img className='w-5 h-5' src={assets.report} alt="" />
          <p className='hidden md:block'>Reports</p>
        </NavLink>



      </div>
    </div>
  )
}

export default Sidebar