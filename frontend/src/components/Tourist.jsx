import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from './Title';
import BusItem from './BusItem';

const Tourist = () => {
    const { busRoutes } = useContext(BookContext); // Fetch busRoutes from context
    const [touristBuses, setTouristBuses] = useState([]);

    // useEffect(() => {
    //     if (busRoutes) {
    //         const filteredVehicles = busRoutes.filter(route => route.category === "Tourist");
    //         setTouristBuses(filteredVehicles);
    //     }
    // }, [busRoutes]);
    

    useEffect(() => {
        // Filter buses specifically for "Tourist Buses"
        const filteredBuses = busRoutes.filter((bus) => bus.category === "Tourist");
        setTouristBuses(filteredBuses);
    }, [busRoutes]); // Only depend on busRoutes

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'TOURIST'} text2={'BUSES'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Plan your next adventure with our private tourist buses. Comfort and reliability guaranteed for your travels!
                </p>
            </div>

            {/* Rendering Tourist Buses */}
            <div className='grid grid-cols-3 gap-40 gap-y-6'>
                {touristBuses.map((item, index) => (
                    <BusItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tourist;
