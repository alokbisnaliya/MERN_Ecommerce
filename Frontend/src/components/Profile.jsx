import { Container } from 'postcss';
import React, { useEffect, useState } from 'react';
const baseURL = import.meta.env.VITE_API_URL;

const Profile = () => {

    let [originalData, setOriginalData] = useState(null);

    const [islogin, setIslogin] = useState(false)

    console.log(islogin)

    const customForm = [
        { label: 'Name', id: 'name' },
        { label: 'Email', id: 'email' },
        { label: 'Phone', id: 'phone' },
        { label: 'Address1', id: 'address1' },
        { label: 'Address2', id: 'address2' },
        { label: 'State', id: 'state' },
        { label: 'Country', id: 'country' },
        { label: 'Pin Code', id: 'pincode' },
        { label: 'City', id: 'city' },
    ];

    const [formData, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let res = await fetch(`${baseURL}/user/data`, {
                    method: "GET",
                    credentials: "include",
                });

                let data = await res.json();
                if (res.ok) {
                    setFormdata(data.user)
                    setOriginalData(data.user)
                    setIslogin(true)
                } else {
                    setIslogin(false)
                }
            } catch (error) {
                console.log(error)
            }
        }


        fetchUserData();

    }, [])
    // console.log(originalData)


    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const isSameData = (a, b) => {
        return (JSON.stringify(a) === JSON.stringify(b))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSameData(formData, originalData)) {
            alert("no changes made")
            return
        }

        try {
            let res = await fetch(`${baseURL}/user/update/profile`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (res.ok) {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }
    };

  return (
  <div>
    {islogin ? (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6 sm:p-10">
          <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">User Profile</h2>

          <div className="flex flex-col sm:flex-row items-center justify-center mb-10">
            <div className="w-32 h-32 rounded-full border-4 border-gray-400 overflow-hidden">
              <img
                src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customForm.map(({ label, id }) => (
              <div key={id} className="flex flex-col">
                <label htmlFor={id} className="mb-2 text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  onChange={handleChange}
                  name={id}
                  value={formData[id]}
                  type="text"
                  id={id}
                  className="px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </section>
    ) : (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-xl text-gray-700 font-semibold text-center">
          🔒 To see the profile, you need to log in first.
        </h1>
      </div>
    )}
  </div>
);

};

export default Profile;
