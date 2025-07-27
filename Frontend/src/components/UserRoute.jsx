import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;

const UserRoute = ({ children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch(`${baseURL}/api/getuserRole`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          setRole(data);
        } else {
          setRole(null);
        }
      } catch (err) {
        console.error('Error fetching user role:', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (role !== 'user') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default UserRoute;
