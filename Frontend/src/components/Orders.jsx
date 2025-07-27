import React, { useEffect, useState } from 'react';
// import UserContext from './UserContext';
import { Link } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;

const Orders = () => {
  // const {isLoggedin , setIsloggedin} = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      let res = await fetch(`${baseURL}/api/myorders`, {
        method: "GET",
        credentials: "include",
      });

      let data = await res.json();

      if (res.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  //  console.log(isLoggedin)
  // if (!isLoggedin) {
  //   return (
  //     <section>
  //        <div className='w-full h-screen bg-gray-700'></div>
  //     </section>
  //   )
  // }

  return (
    <section className="w-full min-h-screen bg-gray-50 py-10 px-5">
      <div className="max-w-4xl mx-auto space-y-6">
        {orders.length >= 1 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="text-md text-gray-700">
                    <span className="font-medium text-gray-900">Status: </span>
                    <span className={`font-semibold ${order.status !== 'cancelled' ? "text-green-600" : "text-red-500"}`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="font-medium text-gray-900">Ordered On:</span> May 30, 2025
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="font-medium text-gray-900">Delivered By:</span> June 3, 2025
                  </p>
                </div>
                <p className="text-lg font-bold text-gray-800">Total: ₹{order.totalAmount}</p>
                {order.status !== 'cancelled' ? (
                  <Link to={`/cancel/${order._id}`}>
                    <button className="text-white bg-red-500 rounded-md hover:bg-red-600 font-semibold px-2 py-1">Cancel Order</button>
                  </Link>
                ) : (
                  <h1 className="text-white bg-blue-300 px-2 py-1 rounded-md font-semibold">Cancelled</h1>
                )}
              </div>

              <div className="space-y-3">
               {order.items.map((item, index) => (
  item.product ? (
    <div key={item.product._id || index} className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img src={item.product.images} alt="Product" className="w-16 h-16 object-cover rounded-md" />
        <div>
          <p className="font-medium text-gray-800">{item.product.title}</p>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <p className="font-semibold text-gray-700">₹{item.product.price}</p>
    </div>
  ) : (
    <div key={index} className="text-red-500">Product information not available</div>
  )
))}

              </div>
            </div>
          ))
        ) : (
          <div className="w-full mt-10 flex justify-center items-center flex-col gap-4">
            <h1 className="font-semibold text-gray-700 text-2xl shadow-lg px-6 py-4 rounded-md">No Orders yet 👻</h1>
            <h1 className="font-semibold text-gray-700 text-2xl shadow-lg px-6 py-4 rounded-md">Let’s order something!</h1>
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
