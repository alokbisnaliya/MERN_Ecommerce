import React from 'react';
import { NavLink } from 'react-router-dom';

const Card = ({ phones, route }) => {
  return (

    <div className="mt-4 flex justify-center flex-wrap gap-4">
      {phones.map((item, index) => {
        return (

          <ul key={index}>
            <NavLink to={`${route}/${item._id}`}>
              <div className="border border-gray-300 rounded-lg w-48 sm:w-56 md:w-60 h-72 sm:h-80 md:h-80 shadow-md transition-transform hover:scale-95">
                {/* Display the image here */}
                <div id="image" className="w-full h-[65%] bg-gray-300 rounded-t-lg">
                  <img
                    src={item.images[0]}  // Assuming 'item.image' is the image URL
                    alt={item.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <footer className="px-3 py-2 flex flex-col gap-1">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">{item.title}</p>
                  <p className="border-b text-gray-600 text-xs sm:text-sm md:text-base">{item.price}</p>
                  <p className="text-green-600 text-xs sm:text-sm md:text-base font-medium">Save - 32,999</p>
                </footer>
              </div>
            </NavLink>
          </ul>
        );
      })}
    </div>

  );
};

export default Card;
