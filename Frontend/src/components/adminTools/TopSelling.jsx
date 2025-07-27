import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

const TopSelling = () => {

  const [product, setProduct] = useState([]);

  async function fetchData() {
   try {
     let res = await fetch("http://localhost:3000/api/topSelling/products",{
      method:"GET",
      credentials:"include"
    })
    let data = await res.json();
    if(res.ok){
      console.log(data)
        setProduct(data)
    }else{
      console.log(data.message)
    }

   } catch (error) {
     console.log(error)
   }
  }

   useEffect(()=>{
     fetchData();
   },[])

   console.log(product);
   

  // Dummy product list with ratings
  // const products = [
  //   { id: 1, title: "NIKE Shoes Black", price: 85, rating: 3 },
  //   { id: 2, title: "Adidas UltraBoost", price: 95, rating: 4 },
  //   { id: 3, title: "Puma Sneakers", price: 75, rating: 2 },
  //   { id: 4, title: "Reebok Runner", price: 60, rating: 5 },
  //   { id: 5, title: "Asics Gel", price: 100, rating: 4 },
  //   { id: 6, title: "New Balance 550", price: 90, rating: 3 },
  //   { id: 7, title: "Converse Classic", price: 65, rating: 2 }
  // ];

  return (
    <section className='mb-5 bg-white rounded-lg px-6 py-5'>
      <h1 className='font-semibold text-xl mb-5'>Top Selling Product</h1>

      <main className='grid md:grid-cols-2 xl:grid-cols-3 gap-5 mx-auto'>
        {product.map((item) => (
          <div key={item._id} className='flex gap-6 max-w-xl rounded-lg bg-gray-50 p-4'>
            <div className='rounded-md w-28 h-28 overflow-hidden bg-blue-100'>
              <img
                src={item.data[0].images[0]}
                alt={item.data[0].title}
                className='object-cover w-full h-full'
              />
            </div>

            <div className='font-medium flex flex-col justify-around'>
              <h2 className='text-xl'>{item.data[0].title}</h2>

              <div className="flex">
                {[...Array(5)].map((_, i) =>
                  i < product.rating ? (
                    <FaStar key={i} className='text-2xl text-yellow-400' />
                  ) : (
                    <CiStar key={i} className='text-2xl text-yellow-400' />
                  )
                )}
              </div>

              <span className='text-lg text-gray-700'>${item.data[0].price}</span>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
};

export default TopSelling;
