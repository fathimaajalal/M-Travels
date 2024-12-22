// BookContext.js
import React, { createContext, useState } from 'react';
import { busRoutes } from '../assets/assets';
import App from '../App';


export const BookContext = createContext();

const BookContextProvider = (props) => {
  const currency = '₹';
  const discount = 10;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    busRoutes,
    currency,
    discount,
    search, setSearch, showSearch, setShowSearch
  };

  return (
    <BookContext.Provider value={value}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
