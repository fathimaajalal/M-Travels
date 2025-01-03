import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Update = ({token}) => {
    const [list, setList] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [updatedData, setUpdatedData] = useState({
        name: '',
        category: '',
        price: '',
        image: [],
    })

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/vehicle/list');

            if (response.data.success) {
                setList(response.data.vehicles);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const handleUpdateClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setUpdatedData({
            name: vehicle.name,
            category: vehicle.category,
            price: vehicle.price,
            image: vehicle.image,
        });
    }

    const handleInputChange = (e) => {
        setUpdatedData({
            ...updatedData,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdateVehicle = async () => {
        try {
            const response = await axios.post(backendUrl + '/api/vehicle/update', {
                id: selectedVehicle._id,
                updatedData,
            }, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
                setSelectedVehicle(null); // Close the update form
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <>
            <p className="mb-2">Update Vehicle</p>

            <div className="flex flex-col gap-2">
                {/* List Table Title */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/* Vehicle List */}
                {list.map((item, index) => (
                    <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
                        <img className="w-16 h-16 object-cover" src={item.image[0]} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{currency}{item.price}</p>
                        <button onClick={() => handleUpdateClick(item)} className='text-right md:text-center cursor-pointer text-lg text-blue-500'>
                            Update
                        </button>
                    </div>
                ))}

                {/* Update Vehicle Form */}
                {selectedVehicle && (
                    <div className="mt-4 p-4 border bg-gray-100">
                        <h2 className="text-xl mb-4">Update Vehicle Details</h2>
                        <div>
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={updatedData.name} 
                                onChange={handleInputChange} 
                                className="mb-2 p-2 border"
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <input 
                                type="text" 
                                name="category" 
                                value={updatedData.category} 
                                onChange={handleInputChange} 
                                className="mb-2 p-2 border"
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input 
                                type="number" 
                                name="price" 
                                value={updatedData.price} 
                                onChange={handleInputChange} 
                                className="mb-2 p-2 border"
                            />
                        </div>
                        <div>
                            <label>Images</label>
                            <input 
                                type="text" 
                                name="image" 
                                value={updatedData.image} 
                                onChange={handleInputChange} 
                                className="mb-2 p-2 border"
                            />
                        </div>
                        <button onClick={handleUpdateVehicle} className="text-white bg-blue-500 px-4 py-2 mt-2">
                            Update Vehicle
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Update
