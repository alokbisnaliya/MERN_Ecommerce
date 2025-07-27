import React from 'react';
import { NavLink } from 'react-router-dom';



const Card2 = ({ categories }) => {
  return (

    <section className="flex flex-wrap gap-4 justify-center">
      {categories.map((item, index) => (
        <NavLink  key={index} to={`/products/${item.category}`}>
          <div className="flex flex-col justify-center items-center gap-3 p-4">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-full border border-gray-400 bg-gray-200 flex items-center justify-center overflow-hidden"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-xs text-gray-500">No Image</span>
              )}
            </div>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-gray-700">
              {item.category}
            </span>
          </div>
        </NavLink>
      ))}
    </section>

  );
};

export default Card2;
