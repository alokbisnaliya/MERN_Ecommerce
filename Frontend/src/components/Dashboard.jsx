import React from 'react';
import Nav from './adminTools/Nav';
import Card from './adminTools/Card';
import { FaUsers } from "react-icons/fa"; // sample icon
import { FaHeart } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiFillProduct } from "react-icons/ai";
import Graph from './adminTools/Graph';
import Orders from './adminTools/Orders';
import TopSelling from './adminTools/TopSelling';



const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className="pt-24 px-6 bg-gray-100 py-5"> {/* Add top padding to push below fixed navbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card icon={<FaUsers className='text-blue-600' />} title="Users" value="245" color={'bg-blue-100'} />
          <Card icon={<AiFillProduct className='text-yellow-600' />} title="Orders" value="567" color={'bg-yellow-100'} />
          <Card icon={<GiTakeMyMoney className='text-pink-800' />} title="Revenue" value="₹ 25K" color={'bg-pink-100'} />
          <Card icon={<FaHeart className='text-green-600' />} title="Stock" value="200+" color={'bg-green-100'} />
        </div>
        <div className='pb-10'>
          <Graph />
          <Orders />
          <TopSelling/>
        </div>

      </div>

    </>
  );
};

export default Dashboard;
