import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from '../components/Title';
import BusItem from '../components/BusItem';
import BusRoute from './BusRoute';

const Collection = () => {
  
  const { busRoutes, search, showSearch } = useContext(BookContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterbusRoutes, setFilterbusRoutes] = useState([]);
  const [category, setCategory] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)){
        setCategory(prev => prev.filter (item => item!== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {
    let busRoutesCopy = busRoutes.slice();

    if(showSearch && search){
      busRoutesCopy = busRoutesCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      busRoutesCopy = busRoutesCopy.filter(item => category.includes(item.category))
    }

    setFilterbusRoutes(busRoutesCopy);
  }

    // useEffect( () => {
    //   setFilterbusRoutes(busRoutes)
    // },[]
    // )

    useEffect (()=>{
        applyFilter();
    },[category, search, showSearch, busRoutes])

    // useEffect(()=>{
    //     console.log(category);
    // },[category])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS</p>
  
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
          <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Regular'} onChange={toggleCategory} /> Regular Buses
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Tourist'} onChange={toggleCategory} /> Tourist Buses
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Offroad'} onChange={toggleCategory} /> Offroad Vehicles
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Shoot'} onChange={toggleCategory}  /> Shoot Vehicles
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
       <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1='ALL' text2='COLLECTIONS' />
            
            {/* Product Sort */}
            {/* <select className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select> */}
          </div>

          {/* Map Routes */}
          <div className='grid grid-cols-3 gap-40 gap-y-6'>
           {   
            filterbusRoutes.map((item,index) => (
              <BusItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
          />
              ))
            }
          </div>
        </div>
    </div>
  );
  
}

export default Collection;