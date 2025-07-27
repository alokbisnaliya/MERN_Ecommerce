import React from 'react';
import Card from './Card';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductFirst = (props) => {
     let {title,highlight,route} = props
     
    return (
        <section className="px-4 md:px-12 lg:px-20 py-4">
            <div className="flex  md:flex-row justify-between items-center md:items-center gap-4 mx-0 md:mx-8">
                {/* Left Section */}
                <div className="left">
                    <div 
                        id="title" 
                        className="text-gray-700 font-medium text-base sm:text-lg md:text-xl lg:text-xl whitespace-nowrap"
                    >
                        {highlight}
                        <span className="text-primary ml-2">{title}</span>
                    </div>
                    <div
                        id="line"
                        className="border border-primary mt-1 w-40 sm:w-60 md:w-72 lg:w-80"
                    ></div>
                </div>

                {/* Right Section */}
               <NavLink to={`${route}`}>
                 <div className="right">
                    <button className="text-primary font-semibold">
                        View All
                    </button>
                </div>
               </NavLink>
            </div>
        </section>
    );
};

export default ProductFirst;
