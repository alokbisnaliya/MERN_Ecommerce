import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FaFileInvoice } from "react-icons/fa6";
import { GrSchedules } from "react-icons/gr";
import { SlCalender } from "react-icons/sl";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";

const SideBar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: <MdDashboard />, label: "Dashboard", color: "text-violet-700" },
    { icon: <SiGoogleanalytics />, label: "Analytics" },
    { icon: <FaFileInvoice />, label: "Invoice" },
    { icon: <GrSchedules />, label: "Schedule" },
    { icon: <SlCalender />, label: "Calendar" },
    { icon: <BiSolidMessageDetail />, label: "Messages" },
    { icon: <IoNotifications />, label: "Notifications" },
    { icon: <IoMdSettings />, label: "Settings" },
  ];

  const [onfullscreen, setOnfullscreen] = useState(false)

  return (
    <>
      <main
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-72 h-screen z-50 bg-white transform transition-transform duration-300 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-8 border-b">
            <h1 className="text-3xl font-bold text-violet-700">Dashboard</h1>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-4 w-full px-4 py-3 text-lg rounded-xl hover:bg-violet-100 transition-colors group ${
                  item.color || "text-gray-700"
                }`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </>
  );
};

export default SideBar;
