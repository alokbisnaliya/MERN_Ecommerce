import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from './UserContext';
const baseURL = import.meta.env.VITE_API_URL;


const Login = () => {
  const navigate = useNavigate();
  const { isLoggedin, setIsLoggedin , role} = useContext(UserContext);
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });

  // ✅ Redirect if already logged in (even if user presses back button)
  // useEffect(() => {
  //   if (isLoggedin && role === "admin") {
  //     navigate('/admin/dashboard', { replace: true });
  //   }
  // }, [isLoggedin, navigate]);

  const handleChange = (e) => {
    setformData({
      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${baseURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      let data = await res.json();
      console.log(data.message);

      if (res.ok) {
        setIsLoggedin(true);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
        });


        if (data.role !== 'user') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
        


        setformData({ email: "", password: "" });
      } else {
        setIsLoggedin(false);
        toast.error(data.message || "Login failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center"
      });
    }
  };

  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white text-gray-800 px-8 py-10 shadow-xl shadow-zinc-400 rounded-lg w-full max-w-md">
        <h1 className="text-center font-semibold text-2xl mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">Email</label>
            <input
              onChange={handleChange}
              id="email"
              name='email'
              value={formData.email}
              type="email"
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">Password</label>
            <input
              onChange={handleChange}
              id="password"
              name='password'
              type="password"
              value={formData.password}
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-600" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <span className="block text-center text-sm mt-6 text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to={"/register"} className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Login;
