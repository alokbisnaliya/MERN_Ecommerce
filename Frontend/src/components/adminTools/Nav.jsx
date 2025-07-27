import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import SideBar from './SideBar';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="w-full px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center bg-white fixed top-0  shadow-sm">
        {/* Left - Hamburger & Mobile Search */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleSidebar}
            className="hover:bg-gray-100 p-2 rounded-full text-gray-600"
          >
            <GiHamburgerMenu className="text-2xl sm:text-3xl" />
          </button>

          {/* Mobile search icon only (hidden on large screens) */}
          <button className="hover:bg-gray-100 p-2 rounded-full text-gray-600 lg:hidden">
            <IoIosSearch className="text-2xl sm:text-3xl" />
          </button>
        </div>

        {/* Center - Search bar for medium and large screens */}
        <div className="hidden lg:flex relative w-64 xl:w-80">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <IoIosSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        </div>

        {/* Right - Notification & Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <button className="hover:bg-gray-100 p-2 rounded-full text-gray-600">
              <FaBell className="text-xl sm:text-2xl" />
            </button>
            <span className="absolute -top-1 -right-1 text-[10px] sm:text-xs bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </div>

          {/* Profile Image */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 border rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Sidebar Component */}
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Nav;
