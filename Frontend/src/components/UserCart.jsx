import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCart2 } from "react-icons/bs";
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;



const UserCart = () => {

    const [products, setProducts] = useState([])

    const fetchCart = async () => {

        try {
            let res = await fetch(`${baseURL}/api/cart/products`, {
                method: "GET",
                credentials: "include"

            })
            let data = await res.json();
            if (res.ok) {


                console.log(data.products)
                setProducts(data.products)

            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchCart();

    }, [])

    const handlerefresh = () => {
        fetchCart();
    };


    const handleRemove = async (prodcutId) => {
        let res = await fetch(`${baseURL}/api/cart/${prodcutId}`, {
            method: "DELETE",
            credentials: 'include'
        })
        let data = await res.json();
        if (res.ok) {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 1000,
            })
            // setTimeout(() => {
                handlerefresh()
            // }, 2000);
        } else {
            console.log("not removed");
        }
    }



    return (
        <section className="relative  w-full min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* <h2 className="text-3xl font-bold mb-6 text-gray-800"><BsCart2/></h2> */}
                <div className="flex flex-wrap gap-6">
                    {products.length > 0 ? products.map((item) => (
                        <div
                            key={item._id}
                            className="w-full md:flex bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Product Image */}
                            <div className="w-full md:w-1/3 h-60 bg-gray-100 flex items-center justify-center">
                                {item.product.images ? (
                                    <img
                                        src={item.product.images[0]}
                                        alt={item.product.title}
                                        className="object-contain max-h-full"
                                    />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">{item.product.title}</h3>
                                    <p className="text-gray-600 mt-2 line-clamp-2">{item.product.description || "No description available."}</p>
                                    <p className="text-gray-700 font-medium mt-4">
                                        Quantity: <span className="font-semibold">{item.quantity}</span>
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-6 flex justify-between items-center">
                                    <Link
                                        to={`/product/${item.product._id}`}
                                        className="text-blue-600 font-medium hover:underline" >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemove(item.product._id);
                                            // Call remove function here
                                        }}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <div className='w-full h-[50vh] mt-14 flex justify-center items-center flex-col' >
                        <h1 className='text-3xl text-white px-5 py-2 rounded-sm bg-primary font-bold'>Empty Cart </h1>
                        <BsCart2 className='text-6xl text-slate-600 text-center mt-3' />

                    </div>}
                </div>
            </div>

            {products.length > 0 && <div className='sticky bottom-0 w-full flex justify-center items-center p-5 bg-white z-10 mt-5'>
                <Link to={'/checkout'}>
                    <button className='px-5 py-2 bg-green-500 text-white font-semibold rounded-md'>


                        Proceed to checkout
                    </button>
                </Link>
            </div>}
        </section>

    )
}

export default UserCart