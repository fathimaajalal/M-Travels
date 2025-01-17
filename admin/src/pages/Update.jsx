import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Update = ({ token }) => {

    const [list, setList] = useState([])
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [updatedDetails, setUpdatedDetails] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        totalSeats: '',
        seating: '',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        // stops: []
    })

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/vehicle/list')
            if (response.data.success) {
                setList(response.data.vehicles)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleUpdateClick = async (vehicleId) => {
        try {
            const response = await axios.post(backendUrl + '/api/vehicle/single', { vehicleId })
            if (response.data.success) {
                setSelectedVehicle(response.data.vehicle)
                setUpdatedDetails(response.data.vehicle) // Populate form fields with vehicle data
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdatedDetails(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleStopChange = (index, e) => {
        const newStops = [...updatedDetails.stops]; // Clone the stops array
        newStops[index] = e.target.value; // Update the specific stop
        setUpdatedDetails(prevState => ({
            ...prevState,
            stops: newStops,
        }));
    };

    const handleAddStop = () => {
        setUpdatedDetails(prevState => ({
            ...prevState,
            stops: [...prevState.stops, ''], // Add an empty stop field
        }));
    };

    const handleImageChange = (e, imageNumber) => {
        const file = e.target.files[0];
        setUpdatedDetails((prevState) => ({
            ...prevState,
            [`image${imageNumber}`]: file,
        }));
    };

    const handleImageRemove = (imageNumber) => {
        setUpdatedDetails((prevState) => ({
            ...prevState,
            [`image${imageNumber}`]: null,
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('id', selectedVehicle._id);
            formData.append('name', updatedDetails.name);
            formData.append('description', updatedDetails.description);
            formData.append('price', updatedDetails.price);
            formData.append('category', updatedDetails.category);
            formData.append('departureTime', updatedDetails.departureTime);
            formData.append('arrivalTime', updatedDetails.arrivalTime);
            formData.append('availableSeats', updatedDetails.availableSeats);
            formData.append('totalSeats', updatedDetails.totalSeats);
            formData.append('seating', updatedDetails.seating);

            // Add stops to FormData
            updatedDetails.stops.forEach((stop, index) => {
                formData.append(`stops[${index}]`, stop);
            });

            // Add files to FormData
            if (updatedDetails.image1) formData.append('image1', updatedDetails.image1);
            if (updatedDetails.image2) formData.append('image2', updatedDetails.image2);
            if (updatedDetails.image3) formData.append('image3', updatedDetails.image3);
            if (updatedDetails.image4) formData.append('image4', updatedDetails.image4);

            const response = await axios.post(backendUrl + '/api/vehicle/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
                setSelectedVehicle(null); // Close the update modal/form
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <p className="mb-2">All Vehicles List</p>

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
                        <p onClick={() => handleUpdateClick(item._id)} className='text-right md:text-center cursor-pointer text-lg'>Update</p>
                    </div>
                ))}
            </div>

            {/* Update Form (if a vehicle is selected) */}
            {selectedVehicle && (
               <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full space-y-4 max-h-[100vh] overflow-y-auto"> {/* Make the form container scrollable */}
                 <h2 className="text-2xl font-semibold mb-4 text-center">Update Vehicle</h2>
                 <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            {/* Form fields for vehicle info */}
                            {/* ... (other fields remain the same) */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium mb-1">Name:</span>
                                    <input
                                        type="text"
                                        name="name"
                                        value={updatedDetails.name}
                                        onChange={handleInputChange}
                                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium mb-1">Price:</span>
                                    <input
                                        type="number"
                                        name="price"
                                        value={updatedDetails.price}
                                        onChange={handleInputChange}
                                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </label>
                                <label>Category:
                                    <select
                                        name="category"
                                        value={updatedDetails.category}
                                        onChange={handleInputChange}
                                        required
                                        className="block w-full px-3 py-2 mt-1 text-sm border rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Regular">Regular Bus</option>
                                        <option value="Tourist">Tourist Bus</option>
                                        <option value="Offroad">Offroad Vehicle</option>
                                        <option value="Shoot">Shoot Vehicle</option>
                                    </select>
                                </label>

                                <label className="flex flex-col">
                                    <span className="text-sm font-medium mb-1">Available Seats:</span>
                                    <input
                                        type="number"
                                        name="availableSeats"
                                        value={updatedDetails.availableSeats}
                                        onChange={handleInputChange}
                                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium mb-1">Total Seats:</span>
                                    <input
                                        type="number"
                                        name="totalSeats"
                                        value={updatedDetails.totalSeats}
                                        onChange={handleInputChange}
                                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </label>
                                <label className="flex flex-col">
                                    <span className="text-sm font-medium mb-1">Seating:</span>
                                    <input
                                        type="text"
                                        name="seating"
                                        value={updatedDetails.seating}
                                        onChange={handleInputChange}
                                        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </label>
                            </div>
                            <label className="flex flex-col">
                                <span className="text-sm font-medium mb-1">Description:</span>
                                <textarea
                                    name="description"
                                    value={updatedDetails.description}
                                    onChange={handleInputChange}
                                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    required
                                />
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((num) => (
                                    <div key={num} className="flex flex-col">
                                        <span className="text-sm font-medium mb-1">Image {num}:</span>
                                        {updatedDetails[`image${num}`] ? (
                                            <div className="relative">
                                                <img
                                                    src={URL.createObjectURL(updatedDetails[`image${num}`])}
                                                    alt={`Image ${num}`}
                                                    className="w-32 h-32 object-cover mb-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleImageRemove(num)}
                                                    className="absolute top-0 right-0 text-red-600 bg-white p-1 rounded-full"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ) : (
                                            <input
                                                type="file"
                                                name={`image${num}`}
                                                onChange={(e) => handleImageChange(e, num)}
                                                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        )}
                                    </div>
                                    
                                ))}
                            </div>
                            

                            {/* Stops Section */}
<div className="space-y-4">
    {updatedDetails.stops.map((stop, index) => (
        <div key={index} className="flex gap-2">
            <input
                type="text"
                value={stop}
                onChange={(e) => handleStopChange(index, e)}
                className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter stop name"
            />
            {updatedDetails.stops.length > 1 && (
                <button
                    type="button"
                    onClick={() => {
                        const newStops = [...updatedDetails.stops];
                        newStops.splice(index, 1); // Remove stop at index
                        setUpdatedDetails(prevState => ({
                            ...prevState,
                            stops: newStops,
                        }));
                    }}
                    className="text-red-600 text-sm"
                >
                    Remove
                </button>
            )}
        </div>
    ))}

    <button
        type="button"
        onClick={handleAddStop}
        className="text-blue-600 text-sm"
    >
        Add Stop
    </button>
</div>


                            {/* Submit Button */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setSelectedVehicle(null)} // Close modal
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Update Vehicle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Update