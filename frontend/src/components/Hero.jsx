import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'> 
        {/* Hero Left */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>OUR POPULAR BUSES</p>
                </div>
                <h1 className='pt-serif-caption-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'> MUBARAK TRAVELS </h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>BOOK NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side */}
        <video 
            className='w-full sm:w-1/2 h-[600px] object-cover' 
            src={assets.mtravels} 
            autoPlay 
            loop 
            muted 
            playsInline
        ></video>

    </div>
  )
}

export default Hero
