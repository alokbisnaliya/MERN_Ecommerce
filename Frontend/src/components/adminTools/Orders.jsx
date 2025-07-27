import React, { useEffect, useState } from 'react';




const Orders = () => {
  const [allorders, setAllorders] = useState([]);
  const [currentpage, setCurrentpage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const Params = new URLSearchParams({
     currentpage,
     limit:4,
  })
  console.log(Params.toString())

  const fetchOrders = async () => {
    try {
      let res = await fetch(`http://localhost:3000/api/ordersData?${Params.toString()}}`,{
        method: "GET",
        credentials: "include"
      })
      let data = await res.json();
      if (res.ok) {
        setAllorders(data.orders)
        setTotalPages(data.totalpages)
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchOrders();
  },[])

  const PageArray = Array.from({ length: totalPages }, (_, i) => i + 1)
 


  const handlePrevious = () => {
    setCurrentpage((prev) => {
      return prev > 1 ? prev - 1 : PageArray.length
    })
  }

  const handleNext = () => {
    setCurrentpage((prev) => {
      return prev === PageArray.length ? 1 : prev + 1
    })
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full overflow-x-auto mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <input
          type="text"
          placeholder="Search here"
          className="border px-3 py-1 rounded-md text-sm outline-none"
        />
      </div>

      <table className="min-w-[700px] w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2"><input type="checkbox" /></th>
            <th className="py-2">Tracking no</th>
            <th className="py-2">Product Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">In Stock</th>
            <th className="py-2">Total Order</th>
          </tr>
        </thead>
        <tbody>
          {allorders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">


              <td className="py-2"><input type="checkbox" /></td>

              <td className="py-2">{order.productinfo[0]._id}</td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 h-8 object-cover rounded"
                    src={order.productinfo[0].images[0]}
                    alt={order.productinfo[0].title}
                  />
                  <span>{order.productinfo[0].title}</span>
                </div>
              </td>

              <td className="py-2">{order.productinfo[0].price}</td>
              <td className="py-2">{order.productinfo[0].stock}</td>
              <td className="py-2">{order.totalQuantity}</td>
              <td className="py-2">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {order.productinfo[0].price * order.totalQuantity}
                </span>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between text-sm text-gray-600">
        <span>{`${currentpage} of ${totalPages}`}</span>
        <div className="flex items-center gap-2">
          <button onClick={handlePrevious} className="px-2">◀</button>

          {PageArray.map((pageNum) => {
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentpage(pageNum)}
                className={`px-3 py-1 rounded-full ${currentpage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                  }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button onClick={handleNext} className="px-2">▶</button>
        </div>
      </div>

    </div>
  );
};

export default Orders;
