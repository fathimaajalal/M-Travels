import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from './Title';
import BusItem from './BusItem';

const Offroad = () => {
    const { busRoutes } = useContext(BookContext);
    const [offroadVehicles, setOffroadVehicles] = useState([]);

    // useEffect(() => {
    //     if (busRoutes) {
    //         const filteredVehicles = busRoutes.filter(route => route.category === "Offroad");
    //         setOffroadVehicles(filteredVehicles);
    //     }
    // }, [busRoutes]);
    

    useEffect(() => {
        // Filter vehicles specifically for offroading
        const filteredVehicles = busRoutes.filter(route => route.category === "Offroad");
        setOffroadVehicles(filteredVehicles);
    }, [busRoutes]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'OFFROAD'} text2={'VEHICLES'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Rugged and reliable vehicles designed for challenging terrains and adventure enthusiasts.
                </p>
            </div>

            {/* Rendering Offroad Vehicles */}
            <div className='grid grid-cols-3 gap-40 gap-y-6'>
                {offroadVehicles.map((item, index) => (
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

export default Offroad;
