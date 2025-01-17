import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from './Title';
import BusItem from './BusItem';

const Regular = () => {
  const { busRoutes } = useContext(BookContext);
  const [regularBuses, setRegularBuses] = useState([]);

  useEffect(() => {
    setRegularBuses(busRoutes.slice(0, 3));
  }, [busRoutes]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'REGULAR'} text2={'BUSES'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Affordable and comfortable, ideal for daily commutes and short-distance travel.
        </p>
      </div>

      {/* Rendering busRoutes */}
      <div className='grid grid-cols-3 gap-40 gap-y-6'>
        {regularBuses.map((item, index) => (
          <BusItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            // Do not pass the price here for regular buses
          />
        ))}
      </div>
    </div>
  );
};

export default Regular;
