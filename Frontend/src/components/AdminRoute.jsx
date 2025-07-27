import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const baseURL = import.meta.env.VITE_API_URL;


const AdminRoute = ({ children }) => {
  // const { isLoggedin, role, loading } = useContext(UserContext);
  // console.log(role)

  const [role, setRole] = useState(null)
  const [isLoggedin, setIsLoggedin] = useState(false)
  async function fetchUser() {
    try {
      let res = await fetch(`${baseURL}/api/isloggedin`, {
        method: "GET",
        credentials: "include"
      })
      let data = await res.json()
      if (res.ok) {
        console.log(data)
        setRole(data.role)
        setIsLoggedin(true)
      }
    } catch (error) {

    }
  }

  fetchUser();


  if (role === null) {
    return <p>Loading...</p>
  }
  if (!isLoggedin) {
    return <Navigate to='/login' replace />
  }
  if (role.toLowerCase() !== 'admin') {
    return <Navigate to='unauthorised' replace />
  }


  return children;
};

export default AdminRoute;
