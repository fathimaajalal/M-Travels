import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import { Link } from 'react-router-dom';

const BusItem = ({ id, image, name, price, category }) => {
  const { currency } = useContext(BookContext);

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/busRoute/${id}`}>
      <div className='overflow-hidden w-60 h-60 sm:w-80 sm:h-80 mx-auto'>
        <img
          className='hover:scale-110 transition ease-in-out w-full h-full object-cover'
          src={image[0]}
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-lg'>{name}</p>
      {category !== 'Regular' && (  // Hide price for 'Regular' category
        <p className='text-lg font-medium'>{currency}{price}</p>
      )}
    </Link>
  );
};

export default BusItem;
