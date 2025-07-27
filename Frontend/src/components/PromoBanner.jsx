import React, { useState, useEffect } from 'react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const baseURL = import.meta.env.VITE_API_URL;


const PromoBanner = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)


  const fetchData = async () => {
    try {
      let res = await fetch(`${baseURL}/api/banner/data`, {
        method: "GET",
        credentials: "include"
      })
      let data = await res.json()
      if (res.ok) {
        setProducts(data)
      } else {
        toast.error(data.message || "Something went wrong", {
          position: "top-center",
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [products])

  if (products.length === 0) {
    return <div className="text-center py-6 text-gray-400">Loading banners...</div>
  }

  const currentSlide = products[currentIndex]

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
     className="flex justify-center items-center mt-6">
      <div className="relative w-[90%] max-w-full bg-[#212844] rounded-xl text-white flex justify-between items-center px-16 py-6 overflow-visible">

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-zinc-100 border-2 border-white text-gray-700 rounded-full w-12 h-12 flex justify-center items-center shadow-md z-10"
        >
          <GrFormPrevious className="text-2xl text-primary" />
        </button>

        {/* Content Area */}
        <div 
        onClick={()=> navigate(`/product/${currentSlide._id}`)}
        className="flex md:flex-row items-center justify-between w-full">
          <div className="text-center md:text-left md:w-1/2 space-y-2">
            <p className="text-sm text-blue-200">{currentSlide.description}</p>
            <h2 className="text-3xl md:text-4xl font-bold">{currentSlide.title}</h2>
            <p className="text-blue-300 font-semibold">{currentSlide.offer || "Flat 25% Off"}</p>
          </div>

          <div className="mt-4 md:mt-0 md:w-1/2 flex justify-center">
            <img
              src={currentSlide.images}
              alt={currentSlide.title}
              className="w-[150px] md:w-[200px] object-contain"
            />
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-zinc-100 border-2 border-white rounded-full w-12 h-12 flex justify-center items-center shadow-md z-10"
        >
          <GrFormNext className="text-2xl text-primary" />
        </button>
      </div>
    </section>
  )
}

export default PromoBanner
