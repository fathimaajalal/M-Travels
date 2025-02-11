import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { assets } from '../assets/assets';

const BusRoute = () => {
  const { routeId } = useParams();
  const { busRoutes, currency } = useContext(BookContext);
  const [routeData, setRouteData] = useState(null);
  const [image, setImage] = useState('');
  const [fromStop, setFromStop] = useState('');
  const [toStop, setToStop] = useState('');
  const [price, setPrice] = useState(null);

  const fetchRouteData = () => {
    const selectedRoute = busRoutes.find((item) => item._id === routeId);
    if (selectedRoute) {
      setRouteData(selectedRoute);
      setImage(selectedRoute.image[0]);
      setPrice(selectedRoute.price);
    }
  };

  const navigate = useNavigate();

  // Function to check if the user is logged in based on token
  const isUserLoggedIn = () => {
    return !!localStorage.getItem('token');
  };


  // const handleBookNow = (routeId, price) => {
  //   if (!isUserLoggedIn()) {
  //     alert("Please log in to proceed!");
  //     navigate('/login'); // Redirect to login if not logged in
  //     return;
  //   }
  //   navigate('/book-ticket', { state: { routeId, price } });
  // };
  
  const handleBookNow = (routeId, price) => {
    if (!isUserLoggedIn()) {
      alert("Please log in to proceed!");
      navigate('/login'); // Redirect to login if not logged in
      return;
    }
    navigate('/book-ticket', { state: { routeId, price } });
  };


  // Update price based on selected stops
  useEffect(() => {
    if (fromStop && toStop) {
      const selectedRoute = busRoutes.find(route => route._id === routeId);
      if (selectedRoute) {
        const stops = selectedRoute.stops;
        const fromIndex = stops.indexOf(fromStop);
        const toIndex = stops.indexOf(toStop);
        const stopDifference = Math.abs(toIndex - fromIndex);
        const updatedPrice = selectedRoute.price + stopDifference * 10;
        setPrice(updatedPrice);
      }
    }
  }, [fromStop, toStop, busRoutes, routeId]);

  useEffect(() => {
    fetchRouteData();
  }, [routeId, busRoutes]);

  return routeData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Route Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Route Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {routeData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt={`Route ${index}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Selected Route" />
          </div>
        </div>

        {/* Route Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{routeData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_icon} className="w-3.5" alt="" />
            <img src={assets.star_dull} className="w-3.5" alt="" />
            <p className="text-sm pl-2">(23)</p>
          </div>

          {/* Conditional Price Display */}
          <p className="mt-5 text-3xl font-medium">
            {currency}{price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{routeData.description}</p>

          {/* Conditional Details for Buses */}
          {routeData.category === 'Regular' && (
            <div className="mt-5 text-sm text-gray-600">
              <p>Departure Time: {routeData.departureTime || 'N/A'}</p>
              <p>Arrival Time: {routeData.arrivalTime || 'N/A'}</p>

              {/* Stops Section */}
              {/* <div className="flex flex-wrap gap-2 mt-4 items-center">
                <p className="font-medium">Stops:</p>
                {routeData.stops && routeData.stops.length > 0 ? (
                  <div className="flex flex-wrap items-center">
                    {routeData.stops.map((stop, index) => (
                      <span key={index} className="stop-item">
                        {stop}
                        {index < routeData.stops.length - 1 && " → "}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>Standard</p>
                )}
              </div> */}

              {/* Conditional From/To Inputs */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Stops:</label>
                <div className="flex gap-4 mt-2">
                  <select
                    name="fromStop"
                    value={fromStop}
                    onChange={(e) => setFromStop(e.target.value)}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    required
                  >
                    <option value="">From</option>
                    {routeData.stops.map(stop => (
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
                    {routeData.stops.map(stop => (
                      <option key={stop} value={stop}>{stop}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          )}

          <br />
          {/* <button
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            onClick={() => handleBookNow(routeData._id)}
          >
            BOOK NOW
          </button> */}

<button
  className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
  onClick={() => handleBookNow(routeData._id, price)}
>
  BOOK NOW
</button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Secure Payments.</p>
            <p>Comfortable Rides.</p>
            <p>Easy Cancellations.</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default BusRoute;
