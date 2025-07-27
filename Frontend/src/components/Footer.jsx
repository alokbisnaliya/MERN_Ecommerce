import React from 'react';
import { FaWhatsapp, FaPhoneAlt, FaApple, FaGooglePlay } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0079c1] text-white px-6 py-10 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">

        {/* Contact Section */}
        <div className="space-y-5 text-center md:text-left ">
          <h1 className="text-3xl font-bold font-mono">MegaMart</h1>
          <h3 className="cursor-pointer text-lg font-semibold">Contact Us</h3>
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <FaWhatsapp />
            <p className="cursor-pointer text-sm">+1 202-918-2132</p>
          </div>
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <FaPhoneAlt />
            <p className="cursor-pointer text-sm">+1 202-918-2132</p>
          </div>

          {/* App Buttons */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Download App</p>
            <div className="flex justify-center md:justify-start space-x-3">
              <button className="bg-black px-4 py-2 rounded-lg flex items-center space-x-2 text-sm shadow-md hover:opacity-90 transition">
                <FaApple />
                <span>App Store</span>
              </button>
              <button className="bg-black px-4 py-2 rounded-lg flex items-center space-x-2 text-sm shadow-md hover:opacity-90 transition">
                <FaGooglePlay />
                <span>Google Play</span>
              </button>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="text-center md:text-left ">
          <h3 className="text-lg font-semibold mb-4">Most Popular Categories</h3>
          <ul className="space-y-2 text-sm text-blue-100 cursor-pointer">
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Baby Care</li>
            <li>Vegetables & Fruits</li>
            <li>Snacks & Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </div>

        {/* Customer Services */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Customer Services</h3>
          <ul className="space-y-2 text-sm text-blue-100 cursor-pointer">
            <li>About Us</li>
            <li>Terms & Conditions</li>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation & Return Policy</li>
          </ul>
        </div>
      </div>

      {/* Divider + Bottom Note */}
      <div className="border-t border-blue-300 mt-10 pt-6 text-center text-sm text-blue-100">
        © 2025 MegaMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
