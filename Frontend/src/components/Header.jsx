import React, { useEffect, useState } from 'react';
import { FaAlignLeft } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";
import MobileSidebar from './MobileSidebar';
import Navbarlinks from './Navbarlinks';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from 'react-toastify';
import UserContext from './UserContext';
import { useContext } from 'react';

const baseURL = import.meta.env.VITE_API_URL;



const Header = () => {
  const { isLoggedin, setIsLoggedin } = useContext(UserContext); // ✅
  const navigate = useNavigate();
  const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const [searchitem, setSearchitem] = useState('');

  

  const handleLogout = async () => {
    try {
      let res = await fetch(`${baseURL}/api/logout`, {
        method: "GET",
        credentials: "include"
      })
      let data = await res.json();
      if (res.ok) {
        navigate('/')
        toast.success(data.message, {
          position: "top-center"
        })
        setIsLoggedin(false)
      }
    } catch (error) {
      console.log(error)
    }
  }



  const handleSearch = () => {
  if (searchitem.trim()) {
    navigate(`/search?q=${encodeURIComponent(searchitem).trim()}`);
  } else {
    toast.error("Please enter a search term", {
      position: "top-center",
    });
  }
};


  return (
    <>
      {/* Top Header */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-screen-xl mx-auto py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <button onClick={() => setisSidebarOpen(true)} >
            <FaAlignLeft className="text-primary text-2xl md:hidden" />
          </button>
          <span className="text-primary font-bold text-lg sm:text-xl whitespace-nowrap">MEGA MART</span>
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex">
            {/* 🔍 Icon inside input */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input
                onChange={(e) => setSearchitem(e.target.value)}
                value={searchitem}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 rounded-l bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* 🔘 Search Button */}
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-4 py-2 rounded-r hover:bg-primary-dark transition duration-200"
            >
              Search
            </button>
          </div>
        </div>



        {/* Right - Avatar & Cart */}
        <div className="flex items-center space-x-4">
          {isLoggedin ? <button onClick={handleLogout} >
            <div className=" flex items-center gap-2 cursor-pointer">

              <AiOutlineLogout className="text-primary text-2xl" />
              <span className="text-gray-600 font-medium text-sm sm:text-base">

                logout</span>

            </div>
          </button> : <Link to={'/register'}>
            <div className=" flex items-center gap-2 cursor-pointer">

              <RxAvatar className="text-primary text-2xl" />
              <span className="text-gray-600 font-medium text-sm sm:text-base">

                Sign In</span>

            </div>
          </Link>}

          <div className="md:flex items-center gap-1 cursor-pointer hidden">
            <Link to={'/cart'}><CiShoppingCart className="text-primary text-2xl" /></Link>
            <span className="text-gray-600 font-medium text-sm sm:text-base">Cart</span>
          </div>
        </div>
      </div>

      <Navbarlinks />

      {/* Category Links */}

      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setisSidebarOpen()} />

    </>
  );
};

export default Header;
