import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  const phoneNumber = "9847496988";
  const email = "mubarakvpr@gmail.com";

  return (
    <div>
      {/* Title Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Details Section */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[488px]"
          src={assets.conty_rr}
          alt="Contact Us"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Office</p>
          <p className="text-gray-500">
            Mubarak Spices <br />
            Vandiperiyar, Idukki
          </p>
          <p className="text-gray-500">
            Tel: 9847496988 <br />
            Email: mubarakvpr@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Connect with Us</p>
          <p className="text-gray-500">
            Reach out for queries or support. We're here to assist you.
          </p>
          <a
            href={`tel:${phoneNumber}`}  // Phone number for calling
            className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Call Us
          </a>
          <a
            href={`mailto:${email}`}  // Email for emailing
            className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Email Us
          </a>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
