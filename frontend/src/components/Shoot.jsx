import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import Title from './Title';
import BusItem from './BusItem';

const Shoot = () => {
    const { busRoutes } = useContext(BookContext); // Use the context for vehicles
    const [shootVehicles, setShootVehicles] = useState([]);



    useEffect(() => {
        // Filter vehicles specifically for shoots.
        const filteredVehicles = busRoutes.filter(route => route.category === "Shoot");
        setShootVehicles(filteredVehicles);
    }, [busRoutes]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'VEHICLES FOR'} text2={'SHOOTS'} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Iconic vehicles, perfect for weddings, retro-themed events, and creative photoshoots.
                </p>
            </div>

            {/* Rendering Shoot Vehicles */}
            <div className='grid grid-cols-3 gap-40 gap-y-6'>
                {shootVehicles.map((item, index) => (
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

export default Shoot;
