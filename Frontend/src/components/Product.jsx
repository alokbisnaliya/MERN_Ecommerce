import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecommandedProduct from './RecommandedProduct';
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_API_URL;

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [recommendBy, setRecommendBy] = useState();
  const [recommendedData, setRecommendedData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  // Debounce utility function
  function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }

  // Fetch recommended products
  const fetchRecommendedProducts = async (category) => {
    try {
      const res = await fetch(`${baseURL}/api/product/recommandation?recommandBy=${encodeURIComponent(category)}`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setRecommendedData(data.products);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Manual refresh handler
  const handleRefresh = () => {
    if (recommendBy) {
      fetchRecommendedProducts(recommendBy);
    }
  };

  const debouncedRecommendedFetch = useCallback(debounce(fetchRecommendedProducts, 500), []);

  // Fetch product data
  useEffect(() => {
    async function findProduct() {
      try {
        const res = await fetch(`${baseURL}/api/product/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok && data.product && data.product.category) {
          setProduct(data.product);
          console.log(data.product.category)
          setRecommendBy(data.product.category);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    findProduct();
  }, [id]);

  useEffect(() => {
    if (recommendBy) {
      debouncedRecommendedFetch(recommendBy);
    }
  }, [recommendBy, debouncedRecommendedFetch]);

  const handleCart = async () => {
    try {
      let res = await fetch(`${baseURL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id, quantity: quantity }),
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

  const handleBuynow = () => {
    navigate('/checkout', {
      state: {
        buynow: {
          product: {
            images: product.images[0],
            _id: product._id,
            title: product.title,
            price: product.price,

          },
          quantity: quantity
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (!product) return <div className="text-center mt-10 text-lg text-red-500">Product not found</div>;

  return (
    <section>
      <div className="flex flex-col md:flex-row p-6 gap-8">
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover w-full h-auto rounded-lg shadow"
            />
          </div>

          <div className="flex mt-4 gap-2">
            {product.images.slice(0, 3).map((img, i) => (
              <img key={i} src={img} alt={`thumb-${i}`} className="w-16 h-16 rounded" />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex-1 flex flex-col gap-4 ml-2 sm:mt-10">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="text-yellow-500">⭐⭐⭐⭐☆ (4.5)</div>
          <div className="text-2xl font-semibold text-green-600">₹{product.price}</div>
          <p className="text-gray-700">Inclusive of all taxes</p>

          <div>
            <h3 className="font-semibold text-lg">Offers:</h3>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>10% Instant Discount on Credit Card</li>
              <li>Free screen replacement for 6 months</li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="qty">Quantity:</label>
            <select id="qty" onChange={(e) => setQuantity(+e.target.value)} className="border p-1 rounded">
              {[1, 2, 3, 4, 5].map((q) => (
                <option value={q} key={q}>{q}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button onClick={handleCart} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded">Add to Cart</button>
            <button onClick={handleBuynow} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="p-6 ml-3">
        <div>
          <h2 className="text-xl font-semibold mb-2">Product Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
        <button className="text-primary text-lg font-semibold">Read more</button>
      </div>

      <div id="recommended">
        <div className="w-full px-8 py-5">
          <RecommandedProduct handleRefresh={handleRefresh} recommandedData={recommendedData} />
        </div>
      </div>
    </section>
  );
};

export default Product;
