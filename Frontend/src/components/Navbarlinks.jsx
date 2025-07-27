import React from 'react';
import { Link , NavLink} from 'react-router-dom';

const Navbarlinks = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'My Account', path: '/profile' },
    // { name: 'Wishlist', path: '/wishlist' },
    { name: 'Orders', path: '/orders' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="md:flex justify-center items-center hidden">
      <div className="px-4 py-2 rounded-lg overflow-x-auto scrollbar-hide">
        <ul className="flex space-x-3 min-w-max">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={({isActive})=> `${isActive ? 'bg-primary text-white' : 'bg-white text-primary'} text-primary font-semibold hover:bg-primary hover:text-white px-4 py-2 rounded-full whitespace-nowrap cursor-pointer text-sm sm:text-base`}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbarlinks;
