import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className='my-10 py-6'>
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        {/* Easy Cancellations Policy */}
        <div>
          <img src={assets.cancel_icon} className="w-12 m-auto mb-5" alt="Cancel Icon" />
          <p className="font-semibold">Easy Cancellations</p>
          <p className="text-gray-400">Cancel your booking hassle-free at any time.</p>
          <p className="text-gray-300">(Only for POA)</p>
        </div>

        {/* Customer Support Policy */}
        <div>
          <img src={assets.support_icon} className="w-12 m-auto mb-5" alt="Support Icon" />
          <p className="font-semibold">Customer Support</p>
          <p className="text-gray-400">
  Need help? Contact us via email or call—we’re here for you!
</p>


        </div>

        {/* Secure Payments Policy */}
        <div>
          <img src={assets.payment_icon} className="w-12 m-auto mb-5" alt="Payment Icon" />
          <p className="font-semibold">Secure Payments</p>
          <p className="text-gray-400">Your payments are fully secured with encryption.</p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
