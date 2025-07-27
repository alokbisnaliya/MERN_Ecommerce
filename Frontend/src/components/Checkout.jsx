import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserContext from './UserContext';
import { useContext } from 'react';
// import { useParams } from 'react-router-dom';f

const baseURL = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const { isLoggedin, setIsLoggedin } = useContext(UserContext);
  const navigate = useNavigate();

  // const {id} = useParams();
  const location = useLocation();
  const buynow = location.state?.buynow
  // console.log(buynow)

  const [items, setItems] = useState([])
  const [paymentmethod, setPaymentmethod] = useState('COD')


  const totalprice = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity
    })
    return total
  }


  const [formdata, setFormdata] = useState({
    address: "",
    phone: "",
    pincode: "",
    state: "",
    city: ""
  })

  // console.log(formdata)

  const handledetails = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  }


  const cartProducts = async () => {

    if (buynow) {
      setItems([buynow])
    } else {

      let res = await fetch(`${baseURL}/api/cart/products`, {
        method: "GET",
        credentials: "include"
      })
      let data = await res.json();
      if (res.ok) {

        setItems(data.products)
        // console.log(data.products)


      }
    }


  }

  useEffect(() => {
    cartProducts()
  }, [])




  const placeOrder = async () => {
    if (!formdata.address || !formdata.phone || !formdata) {
      return toast.error("fill all details", {
        position: "top-center",
        autoClose: 2000,
      })
    }
    try {
      if (!isLoggedin) {
        return toast.error("Please Login first", {
          position: "top-center",
          autoClose: 2000,
        })
      }
      let res = await fetch(`${baseURL}/api/cart/placeorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formdata,
          items,
          paymentmethod,
          totalAmount: totalprice(),
          createdAt: Date.now()
        })
      })

      let data = await res.json();
      if (res.ok) {
        // console.log(data.message)
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
        })

        navigate('/')

      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleUPI = () => {
    toast.error("UPI not available", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  }



  return (
    <section className="min-h-screen bg-gray-50 p-5">
      <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Details */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h2>
          <form className="space-y-4">
            <input type="text" onChange={handledetails} name='address' placeholder="Address" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name='phone' placeholder="Phone" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name='pincode' placeholder="Pincode" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name='state' placeholder="State" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name='city' placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
          </form>
          <div className='flex gap-10 mt-5'>
            <div onClick={handleUPI} onSelect={() => setUPI(true)} className='space-x-2'>
              <input
                onChange={() => setPaymentmethod('UPI')}
                type='radio'
                name='payment'
                checked={paymentmethod === "UPI"}

              />
              <span>UPI</span>
            </div>
            <div  onSelect={() => setUPI(true)} className='space-x-2'>
              <input
                onChange={() => setPaymentmethod('COD')}
                type='radio'
                name='payment'
                checked={paymentmethod === "COD"}

              />
              <span>COD</span>
            </div>


          </div>
        </div>



        {/* Order Summary */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order</h2>
          <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-4">
            {items.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between border p-4 rounded-md">
                <img src={item.product.images} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                <div className="flex flex-col items-end space-y-1">
                  <span className="text-gray-600">{item.quantity}</span>
                  <p className="text-lg font-semibold text-gray-800">{item.product.price}</p>
                </div>
              </div>
            ))}

            {/* Sticky Total and Button */}
            <div className="sticky bottom-0 z-50 bg-white border-t pt-4 pb-6">
              <div className="flex justify-between text-lg font-semibold px-2">
                <span>Total</span>
                <span>{totalprice()}</span>
              </div>

              {paymentmethod === "UPI" ?
                <button
                  onClick={handleUPI}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition">
                  Proceed to Payment
                </button>

                : <button
                  onClick={(e) => {
                    e.preventDefault();
                    placeOrder()
                  }}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition">
                  Placeorder
                </button>
              }


            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
