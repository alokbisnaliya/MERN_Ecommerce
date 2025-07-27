import React from 'react';
import { Link } from 'react-router-dom';

const MobileSidebar = ({ isOpen, onClose }) => {
  const sidebarLinks = [
    { name: 'Home', path: '/' },
    // { name: 'Wishlist', path: '/wishlist' },
    { name: 'Account', path: '/profile' },
    { name: 'About', path: '/about' },
    { name: 'My Orders', path: '/orders' },
    { name: 'Cart', path: '/cart' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`w-[200px] fixed top-0 left-0 bg-slate-900 h-full transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40 py-5`}
      >
        <div className="w-full flex justify-center">
          <button
            onClick={onClose}
            className="text-white mr-5 p-4 text-xl font-bold font-mono"
          >
            Close
          </button>
        </div>

        <div className="mt-5">
          <ul>
            {sidebarLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  onClick={onClose}
                  className="block px-3 py-4 hover:bg-slate-800 text-white font-semibold border-b border-gray-700"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
