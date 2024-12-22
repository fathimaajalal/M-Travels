import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img 
          className="w-full md:max-w-[450px]" 
          src={assets.about_img} 
          alt="About Us" 
        />
        
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p>
  Mubarak Travels was founded with a commitment to offering safe, comfortable, and reliable travel solutions, bridging destinations with ease.
</p>
<p>
  Since our inception, we have focused on providing high-quality travel experiences tailored to the needs of every customer.
</p>

<b className="text-gray-800">Our Mission</b>
<p>
  Our mission at Mubarak Travels is to ensure seamless journeys, exceptional service, and unforgettable travel experiences for everyone.
</p>

        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
  {/* Quality Assurance Section */}
  <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
    <b>Safety and Comfort:</b>
    <p className="text-gray-600">
      We prioritize your safety and comfort, ensuring a secure and enjoyable travel experience.
    </p>
</div>

{/* Seamless Booking Section */}
<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
    <b>Seamless Booking:</b>
    <p className="text-gray-600">
      Our intuitive platform makes it effortless to search routes, check availability, and book your tickets.
    </p>
</div>

{/* Dedicated Support Section */}
<div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
    <b>Dedicated Support:</b>
    <p className="text-gray-600">
      Our support team is always ready to assist you, ensuring a hassle-free travel experience from start to finish.
    </p>
</div>

</div>

<NewsletterBox />

    </div>
  );
};

export default About;