import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import {
  FunnelIcon,
  CurrencyDollarIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "./Pagination";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;


function ProductListingPage() {
  const [price, setPrice] = useState(50);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortby, setSortby] = useState("relevance");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const { category } = useParams();
  const debounceRef = useRef(null);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("q");
  }, [location.search]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      let res;
      if (query) {
        res = await fetch(
          `${baseURL}/api/search?q=${query}&limit=${limit}&currentPage=${currentPage}`
        );
      } else {
        const queryParams = new URLSearchParams({
          category,
          limit,
          sortby,
          price: price * 100,
          currentPage,
        }).toString();

        res = await fetch(
          `${baseURL}/api/products/filter?${queryParams}`
        );
      }

      let data = await res.json();

      if (res.ok) {
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProducts();
    }, 500);
  }, [price, category, sortby, limit, currentPage, query]);

  useEffect(() => {
    if (query) {
      fetchProducts(); // fetch immediately for search
    } else {
      debouncedFetch(); // debounce only for filters
    }
  }, [query, price, limit, category, sortby, currentPage, debouncedFetch]);

  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleAddtocart = async (productId) => {
    try {
      let res = await fetch(`${baseURL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: productId, quantity: 1 }),
      });

      let data = await res.json();

      if (res.ok) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Filter Bar */}
      <section className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FunnelIcon className="w-6 h-6 text-gray-500" />
          Filters
        </h2>

        <div className="flex gap-4 justify-around flex-wrap">
          <div>
            <label className="font-medium mb-1 flex items-center gap-1">
              <CurrencyDollarIcon className="w-5 h-5 text-gray-600" />
              Price Range
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-700 mt-1">Up to ₹{price * 100}</p>
          </div>

          <div>
            <label className="font-medium mb-1 flex items-center gap-1">
              <ArrowsUpDownIcon className="w-5 h-5 text-gray-600" />
              Sort By
            </label>
            <select
              onChange={(e) => setSortby(e.target.value)}
              className="w-full border rounded p-2"
              value={sortby}
            >
              <option value="relevance">Relevance</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-zinc-800">
          Explore Products
        </h1>

        {loading ? (
          <h1 className="text-xl text-center text-zinc-600">Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="w-64 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <NavLink to={`/product/${product._id}`} className="block">
                    <div className="h-40 bg-zinc-200 rounded-t-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={product.images?.[0]}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <div className="p-3 space-y-1">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem]">
                        {product.title}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium">
                        ₹{product.price}
                      </p>
                      <p className="text-sm text-green-600 font-semibold">
                        Discount: 45%
                      </p>
                    </div>
                  </NavLink>
                  <div className="px-3 pb-3">
                    <button
                      onClick={() => handleAddtocart(product._id)}
                      className="w-full bg-blue-500 text-white text-sm py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-lg font-semibold text-center w-full">
                😔 Currently out of stock
              </h1>
            )}
          </div>
        )}
      </main>

      <Pagination
        pageArray={pageArray}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ProductListingPage;
