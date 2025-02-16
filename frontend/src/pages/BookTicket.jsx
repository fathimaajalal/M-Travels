import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { BookContext } from '../context/BookContext';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const BookTicket = () => {
  const [method, setMethod] = useState('cod'); // Payment method state
  const { navigate, backendUrl, token, busRoutes } = useContext(BookContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bookDate: ''
  });
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [busCategory, setBusCategory] = useState('');
  const [price, setPrice] = useState('');

  const location = useLocation();


  useEffect(() => {
    if (location.state) {
      const { routeId, price } = location.state;
      const selectedRoute = busRoutes.find(route => route._id === routeId);
      if (selectedRoute) {
        setBusCategory(selectedRoute.category); // Store the category
        setPrice(price); // Set the price from the state
      }
    }
  }, [location.state, busRoutes]);


  // Update price based on selected stops
  useEffect(() => {
    if (fromStop && toStop) {
      const selectedRoute = busRoutes.find(route => route._id === location.state?.routeId);
      if (selectedRoute) {
        const stops = selectedRoute.stops;
        const fromIndex = stops.indexOf(fromStop);
        const toIndex = stops.indexOf(toStop);
        const stopDifference = Math.abs(toIndex - fromIndex);
        const updatedPrice = selectedRoute.price + stopDifference * 10;
        setPrice(updatedPrice);
      }
    }
  }, [fromStop, toStop, busRoutes, location.state?.routeId]);



  const onPaymentSuccess = (data) => {
    if (data.success) {
      toast.success(data.message);
      navigate(data.redirectUrl); // Redirect to the bookings page
    } else {
      toast.error("Payment failed. Please try again.");
    }
  };
  
  // Inside the frontend handler for Stripe success URL:
  useEffect(() => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (sessionId) {
          axios.post(`${backendUrl}/verify/stripe`, { session_id: sessionId })
              .then((response) => onPaymentSuccess(response.data))
              .catch((error) => console.error(error));
      }
  }, []);



  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    let bookItem = null;
    const { routeId } = location.state || {};
    if (!routeId) {
      toast.error("Invalid route. Please select again.");
      return;
    }

    // Find the selected route based on `routeId`
    busRoutes.forEach((item) => {
      if (item._id === routeId) {
        const itemInfo = structuredClone(item);
        if (itemInfo) {
          itemInfo.bookDate = formData.bookDate;
          itemInfo.fromStop = fromStop;
          itemInfo.toStop = toStop;
          itemInfo.price = price;
          bookItem = itemInfo;
        }
      }
    });

    if (!bookItem) {
      toast.error("Invalid route selected.");
      return;
    }

    let bookingData = {
      userId: token.userId,
      vehicle: bookItem.name,
      price: bookItem.price,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      image: bookItem.image[0],
      amount: bookItem.price,
      bookDate: formData.bookDate, // Send as string
      fromStop: fromStop,
      toStop: toStop
    };

  

    // Process payment and booking submission
    switch (method) {
      case "cod":
        const response = await axios.post(
          `${backendUrl}/api/booking/book`,
          bookingData,
          { headers: { token } }
        );
        if (response.data.success) {
          navigate("/bookings");
        } else {
          toast.error('Booking failed');
        }
        break;

        case 'stripe':
          const stripeResponse = await axios.post(
              `${backendUrl}/api/booking/stripe`,
              bookingData,
              { headers: { token } }
          );
          if (stripeResponse.data.success) {
              const { sessionId } = stripeResponse.data;
              const stripe = window.Stripe('pk_test_51QgVPICFAXPrvo46GXH4TFBlnuMBFRDqPw7kNhoAtH2DW34CbX5DqLZ1KBJhmdIMUo0Ph8ZyqsmkvEJ8zs1yqSFD00fEIqCDq0'); // Use environment variable
              stripe.redirectToCheckout({ sessionId })
                  .then((result) => {
                      if (result.error) {
                          toast.error(result.error.message);
                      }
                  });
          } else {
              toast.error('Stripe session creation failed');
          }
          break;
      
          case 'razorpay':
            
            break;

      // Razorpay part omitted for now
      default:
        break;
    }
  } catch (error) {
    console.error("Error during booking:", error);
    toast.error(error.message);
  }
};



  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-screen">
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="BOOKING" text2="INFORMATION" />
        </div>
        <div className="flex flex-col gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="bookDate"
            value={formData.bookDate}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="date"
            placeholder="Date"
            required
          />
          <input
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email Address (Optional)"
          />
          <input
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Phone"
            required
          />
          
          {/* Conditional From/To Inputs */}
          {/* {busCategory === 'Regular' && (
            <>
              <select
                name="fromStop"
                value={fromStop}
                onChange={(e) => setFromStop(e.target.value)}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                required
              >
                <option value="">From</option>
                {busRoutes.find(route => route._id === location.state.routeId)?.stops.map(stop => (
                  <option key={stop} value={stop}>{stop}</option>
                ))}
              </select>

              <select
                name="toStop"
                value={toStop}
                onChange={(e) => setToStop(e.target.value)}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                required
              >
                <option value="">To</option>
                {busRoutes.find(route => route._id === location.state.routeId)?.stops.map(stop => (
                  <option key={stop} value={stop}>{stop}</option>
                ))}
              </select>
            </>
          )} */}
        </div>
      </div>

      {/* Right Side - Payment Method and Submission */}
      <div className="mt-8">
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row mt-6">
            {/* Payment Methods */}
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
            {/* <div
  onClick={() => setMethod('razorpay')} // Call Razorpay payment handler on click
  className={`flex items-center gap-3 border rounded-md p-3 cursor-pointer ${method === 'razorpay' ? 'border-black' : 'border-gray-300'}`}
>
  <p
    className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-black' : 'bg-transparent'}`}
  ></p>
  <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay Logo" />
  <p className="text-gray-500 text-sm font-medium">Razorpay</p>
</div> */}

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
              <p className='text-gray-500 text-sm font-medium mx-4'>Pay on Arrival</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-white py-2 px-6 rounded-md">
              Book Now for Rs. {price}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookTicket;