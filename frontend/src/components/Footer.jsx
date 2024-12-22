import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='my-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm'>
        {/* Logo and Description */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
          At Mubarak Travels, we offer convenient and scenic bus routes to make your journey enjoyable. Whether it's a quick city ride or a scenic mountain trip, we’ve got you covered. Book your next adventure with us and experience travel like never before.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Bookings</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 9847496988</li>
            <li>mubarakvpr@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className='my-6' />

      <p className='py-5 text-center text-gray-600'>
        Copyright 2024@mubaraktravels.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
