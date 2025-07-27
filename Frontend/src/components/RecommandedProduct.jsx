import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedProduct = ({ recommendedData, handleRefresh }) => {
  if (!recommendedData || recommendedData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No similar products found.
      </div>
    );
  }

  return (
    <section className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended Products</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {recommendedData.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            onClick={handleRefresh}
          >
            <div className="w-64 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="h-40 bg-zinc-200 rounded-t-xl flex items-center justify-center overflow-hidden">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Price: <span className="text-black font-medium">₹{item.price}</span>
                </p>
                <p className="text-sm text-green-600 font-semibold">Discount: 45%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProduct;
