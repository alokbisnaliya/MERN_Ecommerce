import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Card3 = ({ groceries }) => {





    return (
        <NavLink to={`/products/fruits`} >
            <section className='flex flex-wrap justify-center items-center gap-4 '>

                {groceries.map((item) => {

                    return (
                        <div key={item._id} id="main" className='w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-lg' >
                            <div id="productimage" className='w-full h-[70%] bg-gray-200 overflow-hidden rounded-t-lg'>
                                <img
                                    src={item.images}
                                    alt="Product"
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            <div id="info" className='px-3 py-2 flex flex-col justify-center items-center'>
                                <span className='text-gray-600'>Daily Essentials</span>
                                <p className='text-gray-900 font-medium'>UP to 50% OFF</p>
                            </div>

                        </div>


                    )

                })}



            </section>
        </NavLink>
    )
}

export default Card3