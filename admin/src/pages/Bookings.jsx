import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Bookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);

  const fetchAllBookings = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setBookings(response.data.bookings);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, bookingId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/booking/status`,
        { bookingId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllBookings();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [token]);

  return (
    <div>
      <h3 className="text-3xl font-semibold mb-8 text-center">Booking Page</h3>
      <div>
        {
          // Reverse the bookings array before mapping
          bookings.slice().reverse().map((booking, index) => {
            return (
              <div className='my-8 border-2 border-gray-200 p-6 text-sm sm:text-base text-gray-700 rounded-lg shadow-lg min-h-[250px]' key={index}>

                {/* Flex container to align divs side by side */}
                <div className='flex gap-8 items-start'>
                  {/* 1st div - Icon and vehicle name */}
                  <div className='flex flex-col items-center'>
                    <img className='w-20' src={assets.book_icon} alt="Parcel Icon" />
                    <p className='mt-4 font-semibold text-lg'>{booking.vehicle}</p>
                  </div>

                  {/* 2nd div - Price, Method, Payment, Booked For/On */}
                  <div className='flex-1'>
                    <p className='font-semibold text-xl mt-3'>{currency}{booking.amount}</p>
                    <p className='text-base mt-3'>Method: {booking.paymentMethod}</p>
                    <p className='text-base mt-2'>Payment: {booking.payment ? 'Done' : 'Pending'}</p>
                    <p className='text-base mt-3'>Booked For: {new Date(booking.bookDate).toLocaleDateString()}</p>
                    <p className='text-base mt-2'>Booked On: {new Date(booking.date).toLocaleDateString()}</p>
                  </div>

                  {/* 3rd div - Name and Phone number */}
                  <div className='flex-1'>
                    <p className='font-semibold text-lg mt-3'>{booking.firstName} {booking.lastName}</p>
                    <p className='text-base mt-2'>{booking.phone}</p>
                  </div>

                  {/* 4th div - Status and From/To (if available) */}
                  <div className='flex-1'>
                    <select onChange={(event) => statusHandler(event, booking._id)} value={booking.status} className='p-3 font-semibold border rounded-lg text-base mt-3'>
                      <option value="Booking Successful">Booking Successful</option>
                      <option value="On the way">On the way</option>
                      <option value="Reached">Reached</option>
                      <option value="Canceled">Canceled</option>
                    </select>

                    {/* Conditionally render from and to stops if available */}
                    {booking.fromStop && booking.toStop && (
                      <p className='text-base mt-3'>
                        {booking.fromStop} &rarr; {booking.toStop}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Bookings;
