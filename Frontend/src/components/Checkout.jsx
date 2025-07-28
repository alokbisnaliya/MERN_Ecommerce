import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from './UserContext';

const baseURL = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const { isLoggedin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const buynow = location.state?.buynow;

  const [items, setItems] = useState([]);
  const [paymentmethod, setPaymentmethod] = useState('COD');

  const [formdata, setFormdata] = useState({
    address: '',
    phone: '',
    pincode: '',
    state: '',
    city: ''
  });

  const totalprice = () => {
    return items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const handledetails = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };

  const cartProducts = async () => {
    try {
      if (buynow) {
        setItems([buynow]);
      } else {
        const res = await fetch(`${baseURL}/api/cart/products`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setItems(data.products);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cartProducts();
  }, [buynow]);

  const placeOrder = async () => {
    const { address, phone, pincode, state, city } = formdata;
    if (!address || !phone || !pincode || !state || !city) {
      return toast.error('Fill all details', {
        position: 'top-center',
        autoClose: 2000
      });
    }

    if (!isLoggedin) {
      return toast.error('Please login first', {
        position: 'top-center',
        autoClose: 2000
      });
    }

    try {
      const res = await fetch(`${baseURL}/api/cart/placeorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formdata,
          items,
          paymentmethod,
          totalAmount: totalprice(),
          createdAt: Date.now()
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 2000
        });
        navigate('/');
      }else{
        toast.error(data.message||"can't place order")
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUPI = () => {
    toast.error('UPI not available', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 p-5">
      <main className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Shipping Details */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Details</h2>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            placeOrder();
          }}>
            <input type="text" onChange={handledetails} name="address" placeholder="Address" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name="phone" placeholder="Phone" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name="pincode" placeholder="Pincode" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name="state" placeholder="State" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />
            <input type="text" onChange={handledetails} name="city" placeholder="City" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400" />

            <div className="flex gap-10 mt-5">
              <label className="space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={paymentmethod === "UPI"}
                  onChange={() => setPaymentmethod('UPI')}
                />
                <span>UPI</span>
              </label>
              <label className="space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentmethod === "COD"}
                  onChange={() => setPaymentmethod('COD')}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {paymentmethod === "UPI" ? (
              <button
                type="button"
                onClick={handleUPI}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
              >
                Proceed to Payment
              </button>
            ) : (
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
              >
                Place Order
              </button>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="relative">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Order</h2>
          <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500">No items in cart.</p>
            ) : (
              items.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between border p-4 rounded-md">
                  <img
                    src={item.product.images}
                    alt="Product"
                    className="w-20 h-20 object-cover rounded-md"
                    onError={(e) => (e.target.src = '/placeholder.png')}
                  />
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                    <p className="text-lg font-semibold text-gray-800">₹{item.product.price}</p>
                  </div>
                </div>
              ))
            )}

            {/* Sticky Total */}
            {items.length > 0 && (
              <div className="sticky bottom-0 z-50 bg-white border-t pt-4 pb-6">
                <div className="flex justify-between text-lg font-semibold px-2">
                  <span>Total</span>
                  <span>₹{totalprice()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Checkout;
