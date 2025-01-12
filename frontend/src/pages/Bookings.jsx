import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/BookContext'
import Title from '../components/Title';
import axios from 'axios';


const Bookings = () => {

  const { backendUrl, token, currency } = useContext(BookContext);

  const [bookingData, setBookingData] = useState([])

  const loadBookingdata = async () => {
    try {
      if (!token) {
        return null
      }

      const response = await axios.post(backendUrl + '/api/booking/userbookings', {}, { headers: { token } })
      // console.log(response.data);

      if (response.data.success) {
        let allBookingsItem = [];
        // console.log('bookings',response.data.bookings);
        // response.data.bookings.forEach((booking, index) => {
        //   console.log(`Booking ${index}:`, booking);
        //   console.log(`Image Field:`, booking.image);
        // });


        response.data.bookings.map((booking) => {

          booking['status'] = booking.status
          booking['payment'] = booking.payment
          booking['paymentMethod'] = booking.paymentMethod
          booking['bookDate'] = booking.bookDate
          booking['image'] = booking.image
          allBookingsItem.push(booking)

        })
        // console.log('bookingdata',bookingData);
        setBookingData(allBookingsItem.reverse());
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    loadBookingdata()
    // console.log(backendUrl);
  }, [token])



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
                <p className="mt-2">
                  Date:
                  <span className="text-gray-400">
                    {item.bookDate ? new Date(item.bookDate).toLocaleDateString('en-US', {
                      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'N/A'}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status || 'Pending'}</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm">Track Booking</button>
              {console.log(bookingData)}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Bookings