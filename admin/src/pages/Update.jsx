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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/vehicle/update', { id: selectedVehicle._id, ...updatedDetails }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
        setSelectedVehicle(null) // Close the update modal/form
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

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
        <div className="modal">
          <form onSubmit={handleUpdateSubmit} className="update-form">
            <h2>Update Vehicle</h2>
            <label>Name:
              <input type="text" name="name" value={updatedDetails.name} onChange={handleInputChange} required />
            </label>
            <label>Description:
              <textarea name="description" value={updatedDetails.description} onChange={handleInputChange} required />
            </label>
            <label>Price:
              <input type="number" name="price" value={updatedDetails.price} onChange={handleInputChange} required />
            </label>
            <label>Category:
              <input type="text" name="category" value={updatedDetails.category} onChange={handleInputChange} required />
            </label>
            <label>Departure Time:
              <input type="text" name="departureTime" value={updatedDetails.departureTime} onChange={handleInputChange} />
            </label>
            <label>Arrival Time:
              <input type="text" name="arrivalTime" value={updatedDetails.arrivalTime} onChange={handleInputChange} />
            </label>
            <label>Available Seats:
              <input type="number" name="availableSeats" value={updatedDetails.availableSeats} onChange={handleInputChange} />
            </label>
            <label>Total Seats:
              <input type="number" name="totalSeats" value={updatedDetails.totalSeats} onChange={handleInputChange} />
            </label>
            <label>Seating:
              <input type="text" name="seating" value={updatedDetails.seating} onChange={handleInputChange} />
            </label>
            <button type="submit" className='text-right md:text-center cursor-pointer text-lg'>Update Vehicle</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Update
