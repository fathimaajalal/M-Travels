import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookContext } from '../context/BookContext';
import { assets } from '../assets/assets';

const BusRoute = () => {
  const { routeId } = useParams();
  const { busRoutes, currency } = useContext(BookContext);
  const [routeData, setRouteData] = useState(false);
  const [image, setImage] = useState('');

  const fetchRouteData = async () => {
    busRoutes.map((item) => {
      if (item._id === routeId) {
        setRouteData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  const navigate = useNavigate();
  const handleBookNow = (routeId) => {
    navigate('/book-ticket', { state: { routeId } });
  };
  
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
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull} className="w-3 5" alt="" />
            <p className="text-sm pl-2">(23)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {routeData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{routeData.description}</p>

          {/* Conditional Details for Buses */}
          {routeData.category === 'Regular' && (
            <div className="mt-5 text-sm text-gray-600">
              <p>Departure Time: {routeData.departureTime || 'N/A'}</p>
              <p>Arrival Time: {routeData.arrivalTime || 'N/A'}</p>
              <p>
                Seats: {routeData.availableSeats || 0} /{' '}
                {routeData.totalSeats || 'N/A'}
              </p>
              <p>Seating: {routeData.seating || 'Standard'}</p>
            </div>
          )}

          <br />
          <button 
          className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          // onClick={handleBookNow}
          onClick={() => handleBookNow(routeData._id)}
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

      {/* Description & Review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">
            Reviews (122)
          </p>
        </div>

        {/* Description Content */}
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of goods or services over the internet.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, pricing, and user reviews, allowing
            customers to make informed purchasing decisions.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default BusRoute;
