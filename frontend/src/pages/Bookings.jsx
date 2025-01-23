import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from '../components/Title';
import axios from 'axios';

const Bookings = () => {

  const { backendUrl, token, currency } = useContext(BookContext);
  const [bookingData, setBookingData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const loadBookingdata = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + '/api/booking/userbookings',
        {},
        { headers: { token } }
      );

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
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      verifyStripe(sessionId);
    }
  }, []);


  // Example: Sending session_id to backend for verification
  const verifyStripe = async (sessionId) => {
    try {
      const token = localStorage.getItem('token'); // Adjust this based on where you're storing the token
      console.log('token',token);
      // Check if token is missing
      if (!token) {
        console.error('Token is missing. Please log in again.');
        return;
      }

      const response = await axios.post(
        backendUrl + '/api/booking/verifyStripe',
        { sessionId },
        { headers: { token } }
      );

      await axios.post(
        backendUrl + '/api/booking/userbookings',
        {},
        
      );

      if (response.data.success) {
        console.log('Payment verified and booking saved:', response.data.message);
      } else {
        console.error('Verification failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
    }
  };

  const cancelBooking = async () => {
    try {
      const response = await axios.post(
        backendUrl + '/api/booking/cancel',
        { bookingId: selectedBookingId },
        { headers: { token } }
      );

      if (response.data.success) {
        alert('Booking canceled successfully.');
        loadBookingdata(); // Reload bookings after cancellation
      } else {
        alert('Failed to cancel booking.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while canceling the booking.');
    } finally {
      setShowModal(false);
      setSelectedBookingId(null);
    }
  };

  const openCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBookingId(null);
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
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>{currency}{item.amount}</p>
                  <p className="mt-1">
                    Date:
                    <span className="text-gray-400">
                      {item.bookDate
                        ? new Date(item.bookDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                        : 'N/A'}
                    </span>
                  </p>

                  <p className="mt-1">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>

                {item.fromStop && (
                  <p className="mt-1">
                    <span className="text-gray-400">From: </span>
                    {item.fromStop}
                  </p>
                )}

                {item.toStop && (
                  <p className="mt-1">
                    <span className="text-gray-400">To: </span>
                    {item.toStop}
                  </p>
                )}
              </div>
            </div>

            {/* Status, Track Booking, and Cancel Booking */}
            <div className="md:w-1/2 flex justify-between items-center">
              {/* Status */}
              <div className="flex items-center gap-2">
                <p
                  className={`min-w-2 h-2 rounded-full ${item.status === 'Cancelled' ? 'bg-gray-500' : 'bg-green-500'
                    }`}
                ></p>
                <p className="text-sm md:text-base">{item.status || 'Pending'}</p>
              </div>

              {/* Track Booking Button */}
              <button
                onClick={loadBookingdata}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Booking
              </button>

              {/* Cancel Booking Button (Visible for COD/POA Only) */}
              {(item.paymentMethod === 'COD' || item.paymentMethod === 'POA') &&
                item.status !== 'Cancelled' && (
                  <button
                    onClick={() => openCancelModal(item._id)}
                    className="border px-4 py-2 text-sm font-medium rounded-sm text-red-600 hover:bg-red-100"
                  >
                    Cancel Booking
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Cancel Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-11/12 max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Cancellation</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={cancelBooking}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;