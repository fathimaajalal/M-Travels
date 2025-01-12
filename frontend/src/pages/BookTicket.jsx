import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { BookContext } from '../context/BookContext';
import BusItem from '../components/BusItem';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const BookTicket = () => {
  const [method, setMethod] = useState('cod'); // Payment method state
  const { navigate, backendUrl, token, busRoutes  } = useContext(BookContext); 
  // console.log(backendUrl)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bookDate: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value;

      setFormData(data => ({ ...data, [name]: value }))
  }




  const location = useLocation();
  const { routeId } = location.state || {};



  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      let bookItem = null;
  
      // Find the selected route based on `routeId`
      busRoutes.forEach((item) => {
        if (item._id === routeId) {
          const itemInfo = structuredClone(item);
          if (itemInfo) {
            itemInfo.bookDate = formData.bookDate;
            bookItem = itemInfo;
          }
        }
      });
  
      // console.log('bookItem',bookItem);

      if (!bookItem) {
        toast.error("Invalid route selected.");
        return;
      }
  
      // // Create the booking data with the correct fields
      // let bookingData = {
      //   vehicle: bookItem.name, // Use the name field for vehicle
      //   image: bookItem.image[0],
      //   amount: bookItem.price, // Use the price field for amount
      //   bookDate: bookItem.bookDate,    // Ensure bookDate is added
      // };

      let bookingData = {
        vehicle: bookItem.name,
        image: bookItem.image[0],
        amount: bookItem.price,
        bookDate: formData.bookDate, // Send as string
    };
    

      console.log('bookingData',bookingData);
  
      
  
      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/booking/book`,
            bookingData,
            { headers: { token } }
          );
          // console.log(response.data);
          if (response.data.success) {
            navigate("/bookings");
          } else {
            toast.error(response.data.message);
          }
          break;
  
        default:
          break;
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error(error.message);
    }
  };
  
  
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-screen'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'BOOKING'} text2={'INFORMATION'} />
        </div>
        <div className='flex flex-col gap-3'>
          <input
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First Name'
            required
          />
          <input
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last Name'
            required
          />
          <input
            onChange={onChangeHandler}
            name='bookDate'
            value={formData.bookDate}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='date'
            placeholder='Date'
            required
          />
          <input
            onChange={onChangeHandler}
            name='email'
            value={formData.email}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='email'
            placeholder='Email Address (Optional)'
            
          />
          <input
            onChange={onChangeHandler}
            name='phone'
            value={formData.phone}
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Phone'
            required
          />

        </div>

      </div>

      {/* Right Side - Cart Summary */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          {/* <CartTotal /> */}
        </div>

        <div className='mt-12'>
          {/* Title */}
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row mt-6'>
            {/* Stripe Payment Option */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${method === 'stripe' ? 'border-black' : 'border-gray-300'
                }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-black' : 'bg-transparent'
                  }`}
              ></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
              <p className='text-gray-500 text-sm font-medium'>Stripe</p>
            </div>

            {/* Razorpay Payment Option */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${method === 'razorpay' ? 'border-black' : 'border-gray-300'
                }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black' : 'bg-transparent'
                  }`}
              ></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay Logo" />
              <p className='text-gray-500 text-sm font-medium'>Razorpay</p>
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${method === 'cod' ? 'border-black' : 'border-gray-300'
                }`}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-black' : 'bg-transparent'
                  }`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              // onClick={() => navigate('/bookings')}
              className='bg-black text-white py-2 px-6 rounded-md'
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </form>
  );
};

export default BookTicket;