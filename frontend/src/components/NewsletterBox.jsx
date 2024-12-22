import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className='text-center mt-10'> {/* Added margin-top for space above */}
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off your next adventure</p>
      <p className='text-gray-400 mt-3'>
        Stay updated with our latest travel offers, exclusive deals, and exciting destination recommendations.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-8'> {/* Added margin-top for spacing between form */}
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder="Enter your email" />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  );
}

export default NewsletterBox;
