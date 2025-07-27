import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }


      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(formData), // Send the form data directly
      });

      const data = await response.json(); // Get raw response
      if (response.ok) {
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
        })
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }

    } catch (error) {
      console.log(error);

    }

  };




  return (
    <section className="w-full h-screen flex justify-center items-center bg-gray-100 px-4">
      <div
        id="container"
        className="bg-white text-gray-800 px-8 py-10 shadow-xl shadow-zinc-400 rounded-lg w-full max-w-md"
      >
        <h1 className="text-center font-semibold text-2xl mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium">
              Name
            </label>
            <input
              onChange={handleFormData}
              name='name'
              value={formData.name}
              id="name"
              type="text"
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium">
              Email
            </label>
            <input
              onChange={handleFormData}
              name='email'
              value={formData.email}
              id="email"
              type="email"
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-medium">
              Password
            </label>
            <input
              onChange={handleFormData}
              value={formData.password}
              id="password"
              type="password"
              name='password'
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 font-medium">
              Confirm Password
            </label>
            <input
              onChange={handleFormData}
              value={formData.confirmPassword}
              name='confirmPassword'
              id="confirmPassword"
              type="password"
              className="border-2 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <span className="block text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to={"/login"} className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </span>
      </div>
    </section>
  );
};

export default Register;
