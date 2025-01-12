import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('Regular');
    const [totalSeats, setTotalSeats] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [seating, setSeating] = useState('');

    const [stops, setStops] = useState([{ stopName: '', priceToNextStop: '' }]);
    const handleStopChange = (index, e) => {
        const values = [...stops];
        values[index][e.target.name] = e.target.value;
        setStops(values);
    };
    const addStop = () => {
        setStops([...stops, { stopName: '', priceToNextStop: '' }]);
    };
    
    const removeStop = (index) => {
        const values = [...stops];
        values.splice(index, 1);
        setStops(values);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append('name',name)
            formData.append('description',description)
            formData.append('price',price)
            formData.append('category',category)
            formData.append('totalSeats',totalSeats)
            formData.append('availableSeats',availableSeats)
            formData.append('arrivalTime',arrivalTime)
            formData.append('departureTime',departureTime)
            formData.append('seating',seating)

            image1 && formData.append('image1',image1)
            image2 && formData.append('image2',image2)
            image3 && formData.append('image3',image3)
            image4 && formData.append('image4',image4)


            stops.forEach((stop, index) => {
                formData.append(`stops[${index}][stopName]`, stop.stopName);
                formData.append(`stops[${index}][priceToNextStop]`, stop.priceToNextStop);
            });
    



            const response = await axios.post(backendUrl + "/api/vehicle/add",formData,{headers:{token}})

            if (response.data.success) {

                toast.success(response.data.message);
                setName('')
                setDescription('')
                setPrice('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setArrivalTime('')
                setDepartureTime('')
                setAvailableSeats('')
                setTotalSeats('')
                setSeating('')
                
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      
          <div>
            <p className='mb-2'>Upload Image</p>
      
            <div className='flex gap-2'>
      
              <label htmlFor="image1">
                <img className='w-20' src={!image1 ? assets.upload_icon : URL.createObjectURL(image1)} alt="" />
                <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
              </label>
      
              <label htmlFor="image2">
                <img className='w-20' src={!image2 ? assets.upload_icon : URL.createObjectURL(image2)} alt="" />
                <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
              </label>
      
              <label htmlFor="image3">
                <img className='w-20' src={!image3 ? assets.upload_icon : URL.createObjectURL(image3)} alt="" />
                <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
              </label>
      
              <label htmlFor="image4">
                <img className='w-20' src={!image4 ? assets.upload_icon : URL.createObjectURL(image4)} alt="" />
                <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
              </label>
      
            </div>
          </div>
      
            <div className='w-full'>
                <p className='mb-2'>Vehicle Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500 px] px-3 py-2' type="text" name="" id="" placeholder='Type Here' required/>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Vehicle Description</p>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500 px] px-3 py-2' type="text" name="" id="" placeholder='Type Content Here' required/>
            </div>

            <div className='flex flex-col gap-2 w-full'>

                <div>
                    <p className='mb-2'>Vehicle Category</p>
                    <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                        <option value="Regular">Regular Bus</option>
                        <option value="Tourist">Tourist Bus</option>
                        <option value="Offroad">Offroad Vehicle</option>
                        <option value="Shoot">Shoot Vehicle</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Price</p>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-2' type="Number" placeholder='25'/>
                </div>

                <div>
                    <p className='mb-2'>Departure Time</p>
                    <input onChange={(e)=>setDepartureTime(e.target.value)} value={departureTime} className='w-full px-3 py-2' type="text" placeholder='07:00 AM'/>
                </div>

                <div>
                    <p className='mb-2'>Arrival Time</p>
                    <input onChange={(e)=>setArrivalTime(e.target.value)} value={arrivalTime} className='w-full px-3 py-2' type="text" placeholder='12:00 PM'/>
                </div>

                <div>
                    <p className='mb-2'>Total Seats</p>
                    <input onChange={(e)=>setTotalSeats(e.target.value)} value={totalSeats} className='w-full px-3 py-2' type="Number" placeholder='25'/>
                </div>

                <div>
                    <p className='mb-2'>Available Seats</p>
                    <input onChange={(e)=>setAvailableSeats(e.target.value)} value={availableSeats} className='w-full px-3 py-2' type="Number" placeholder='10'/>
                </div>

                <div>
                    <p className='mb-2'>Seating</p>
                    <input onChange={(e)=>setSeating(e.target.value)} value={seating} className='w-full px-3 py-2' type="text" placeholder='Luxury'/>
                </div>


            </div>

            {/* <div>
                <p>Vehicle Color</p>
            </div> */}

            {/* <div>
                <input type="text" name="" id="" />
                <label htmlFor="bestRoute"></label>
            </div> */}

            {/* Stops Input */}
        <div>
            <p className="mb-2">Stops</p>
            {stops.map((stop, index) => (
                <div key={index} className="flex gap-2">
                    <input
                        type="text"
                        name="stopName"
                        value={stop.stopName}
                        onChange={(e) => handleStopChange(index, e)}
                        placeholder="Stop Name"
                        className="w-full px-3 py-2"
                    />
                    <input
                        type="number"
                        name="priceToNextStop"
                        value={stop.priceToNextStop}
                        onChange={(e) => handleStopChange(index, e)}
                        placeholder="Price to Next Stop"
                        className="w-full px-3 py-2"
                    />
                    <button type="button" onClick={() => removeStop(index)}>-</button>
                </div>
            ))}
            <button type="button" onClick={addStop}>Add Stop</button>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
        </form>
      );
}

export default Add
