import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from '../components/Title';
import axios from 'axios';

const Bookings = () => {
  const { backendUrl, token, currency } = useContext(BookContext);
  const [bookingData, setBookingData] = useState([]);

  const loadBookingdata = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/booking/userbookings', {}, { headers: { token } });

      if (response.data.success) {
        let allBookingsItem = [];
        response.data.bookings.map((booking) => {
          booking['status'] = booking.status;
          booking['payment'] = booking.payment;
          booking['paymentMethod'] = booking.paymentMethod;
          booking['bookDate'] = booking.bookDate;
          booking['image'] = booking.image;

          booking['firstName'] = booking.firstName;
          booking['lastName'] = booking.lastName;
          booking['phone'] = booking.phone;

          booking['fromStop'] = booking.fromStop;
          booking['toStop'] = booking.toStop;

          allBookingsItem.push(booking);
        });
        setBookingData(allBookingsItem.reverse());
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBookingdata();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="BOOKINGS" />
      </div>

      <div>
        {bookingData.map((item, index) => (
          <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col">
            <div className="flex items-start gap-6 text-sm">
              <img
                className="w-16 sm:w-20"
                src={item.image || '/default-image.png'}
                alt={item.name || 'Booking'}
              />

              <div>
                <p className="sm:text-base font-medium">{item.vehicle || 'No Vehicle'}</p>
                <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                  <p>{currency}{item.amount}</p>
                  {/* <p className='mt-2'> */}
                  <p className='mt-1'>
                    Date:
                    <span className="text-gray-400">
                      {item.bookDate ? new Date(item.bookDate).toLocaleDateString('en-US', {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                      }) : 'N/A'}
                    </span>
                  </p>

                  <p className='mt-1'>Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>


                </div>
                {item.fromStop && (
  <p className='mt-1'>
    <span className="text-gray-400">From: </span>{item.fromStop}
  </p>
)}

{item.toStop && (
  <p className='mt-1'>
    <span className="text-gray-400">To: </span>{item.toStop}
  </p>
)}



              </div>
            </div>

            {/* Status, Track Booking, and Date */}
            <div className="md:w-1/2 flex justify-between">
              {/* Status */}
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status || 'Pending'}</p>
              </div>

              {/* Track Booking Button */}
              <button onClick={loadBookingdata} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Booking</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
