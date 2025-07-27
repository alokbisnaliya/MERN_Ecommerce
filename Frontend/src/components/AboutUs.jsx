import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
   const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-white flex flex-col">
      {/* Hero */}
      <div className="w-full bg-gray-50 py-14 px-6 lg:px-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-primary">MegaMart</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop shop for all things essential. Trusted by thousands, delivered with care.
        </p>
      </div>

      {/* Info Grid */}
      <div className="w-full py-16 px-6 lg:px-24 grid md:grid-cols-2 gap-10 items-center bg-white">
        {/* Image */}
        <div>
          <img
          src="https://webeminence.com/wp-content/uploads/2021/02/iStock-831640620.jpg"
            alt="eCommerce"
            className="rounded-xl shadow-md w-full h-full object-cover max-h-[400px]"
          />
        </div>

        {/* Text */}
        <div className="text-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Who We Are</h2>
          <p className="mb-4 text-sm sm:text-base leading-relaxed">
            Founded in 2021, MegaMart is an Indian eCommerce platform focused on affordability, speed, and trust. We’re building the most reliable online store, one delivery at a time.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
            <li>5000+ curated products</li>
            <li>Fast delivery & no-hassle returns</li>
            <li>Secure payments & 24/7 support</li>
            <li>10,000+ satisfied customers</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 py-10 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Start Your Smart Shopping Journey Today
        </h3>
        <button onClick={()=> navigate('/')} className="bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition">
          Explore Products
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
