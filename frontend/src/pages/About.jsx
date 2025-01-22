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

      {/* Mubarak Travels Focus */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img 
          className="w-full md:max-w-[450px]" 
          src={assets.about_img} 
          alt="About Us" 
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <div>
            <b className="text-gray-800">About Us</b>
            <p>
              Mubarak Travels has been a trusted name for over 60 years, connecting the rural villages of Vandiperiyar to all major towns. 
              With over 100 staff members, we pride ourselves on offering reliable and comfortable travel solutions. 
              Our mission is to ensure seamless journeys, exceptional service, and unforgettable travel experiences for everyone.
            </p>
          </div>

          <div>
            <b className="text-gray-800">Our Mission</b>
            <p>
              Our mission at Mubarak Travels is to ensure seamless journeys, exceptional service, and unforgettable travel experiences for everyone. 
              We are committed to offering safe, reliable, and affordable travel services that meet the needs of all our passengers.
            </p>
          </div>

          <div>
            <b className="text-gray-800">Our History</b>
            <p>
              The history of Mubarak begins in the 1950s with Akkarayil Syed Meeran, who moved to Vandiperiyar with his family. He started as a cuisine worker before transitioning to construction. After facing a setback in business, Meeran started from scratch again and eventually ran a ration shop, finding success in spices and travel services. Originally, the group was called ASM (Akkarayil Syed Meeran) and is still known by that name among the older residents of Vandiperiyar.
            </p>
            <p>
              Syed Meeran was supported by his five sons, and after his time, they expanded the business into hardware stores, trading, and automobiles. Today, Mubarak Travels is a well-known name in Vandiperiyar, employing over 100 staff members.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
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
