import React, { useEffect } from 'react'
import { BookContext } from '../context/BookContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const Verify = () => {

    const { navigate, token, backendUrl } = useContext(BookContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const bookingId = searchParams.get('bookingId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendurl + '/api/booking/verifyStripe',{success, bookingId},{headers:{token}})

      if (response.data.success) {
        
        navigate('/bookings');
      } else {
        navigate('/book-ticket');
        console.log('CART');
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[token])
  

  return (
    <div>
        

        
    </div>
  )
}

export default Verify