import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'


const List = ({token}) => {

    const [list, setList] = useState([])
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

    const removeVehicle = async (id) => {   
        try {
            const response = await axios.post(backendUrl + '/api/vehicle/remove',{id},{headers: {token}})
            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
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
             <p onClick={()=> removeVehicle(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
             {/* <div className="text-center">
               <button className="text-blue-500 hover:underline">View</button>
               <button className="ml-2 text-red-500 hover:underline">Delete</button>
             </div> */}
           </div>
         ))}
       </div>
       </>
    )
}

export default List