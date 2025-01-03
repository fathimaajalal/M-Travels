// BookContext.js
import React, { createContext, useEffect, useState } from 'react';
// import { busRoutes } from '../assets/assets';
import App from '../App';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import axios from 'axios'
// import {backendUrl} from '../App'

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const currency = '₹';
  const discount = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
  // console.log('Environment Variables:', import.meta.env);

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // const [vehicles,setVehicles] = useState([])
  const [busRoutes, setBusRoutes] = useState([]);

  const [token, setToken] = useState('')
  const navigate = useNavigate();

  const getVehiclesData = async () => {
    try {
      const url = backendUrl + '/api/vehicle/list';
      const response = await axios.get(url);
      // console.log(response.data);

      // works till here

      if(response.data.success){
        // setBusRoutes(response.data.busRoutes)
        setBusRoutes(response.data.vehicles)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect (()=> {
    getVehiclesData()
  },[])

  useEffect (()=> {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  },[])

  const value = {
    // vehicles,
    busRoutes,
    currency,
    discount,
    search, setSearch, showSearch, setShowSearch,
    backendUrl,
    navigate,
    setToken, token
  };

  return (
    <BookContext.Provider value={value}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
