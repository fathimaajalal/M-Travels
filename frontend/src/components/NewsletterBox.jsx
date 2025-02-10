import React, { useContext, useState } from 'react';
import { BookContext } from '../context/BookContext';
import axios from 'axios';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [discountCode, setDiscountCode] = useState('');

  const { backendUrl, token } = useContext(BookContext);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/subscribe`,
        { email },
        { headers: { token } }
      );

      const data = response.data; // Get the response data directly

      if (data.success) {
        if (data.discountCode) {
          setMessage(data.message);
          setDiscountCode(data.discountCode);
        } else {
          setMessage(data.message);
          setDiscountCode('');
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className='text-center mt-10'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off your next adventure</p>
      <p className='text-gray-400 mt-3'>
        Stay updated with our latest travel offers, exclusive deals, and exciting destination recommendations.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-8'>
        <input
          className='w-full sm:flex-1 outline-none'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>

      {message && <p className='text-red-600 mt-4'>{message}</p>}
      {discountCode && <p className='text-gray-800 font-bold mt-2'>Your Discount Code: {discountCode}</p>}
    </div>
  );
};

export default NewsletterBox;