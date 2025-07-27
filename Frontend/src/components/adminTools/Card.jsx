import React from 'react'

const Card = ({icon, title , value , color}) => {
  return (
 
      <>
      <div className="px-8 py-6 shadow-md bg-white rounded-md flex items-center gap-5 max-w-xl">
        <div id="iconBox" className='flex items-center'>
            <div className={`w-20 h-20 p-5 rounded-full flex justify-center items-center text-3xl ${color} `}>
               {icon}
            </div>

        </div>
        <div id="dataBox" className=''>
            <h1 className='text-3xl font-bold text-gray-600'>{value||"178+"}</h1>
            <p className='text-lg'>{title||"Details"}</p>
        </div>
           
      </div>
      </>
  
  )
}

export default Card