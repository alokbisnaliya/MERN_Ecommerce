import React, { useEffect, useState, useCallback } from "react";
import UserContext from "./UserContext";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_API_URL;

function IsLoggedinProvider({ children }) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkIsLoggedIn = useCallback(async () => {
    try {
      const res = await fetch(`${baseURL}/api/isLoggedin`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      // console.log(data);

      if (res.ok && data.isLoggedin === true) {
        setIsLoggedin(true);
        setRole(data.role);
      } else {
        setIsLoggedin(false);
        setRole(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkIsLoggedIn();
  }, [checkIsLoggedIn]);

  return (
    <UserContext.Provider
      value={{ isLoggedin, setIsLoggedin, role, loading, checkIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default IsLoggedinProvider;
