import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Graph = () => {
  const data = [
    { time: '10am', sales: 60000 },
    { time: '11am', sales: 40000 },
    { time: '12pm', sales: 55000 },
    { time: '01pm', sales: 88000 },
    { time: '02pm', sales: 45000 },
    { time: '03pm', sales: 50000 },
    { time: '04pm', sales: 34000 },
    { time: '05pm', sales: 65000 },
  ];

  const salesData = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/graph", {
        method: "GET",
        credentials: "include"
      })
      let data = await res.json();
      if(res.ok){
        console.log(data)
      }else{
        console.log(data.message)
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(()=>{
    salesData()
  },[])



  console.log(salesData())


  return (
    <section className="bg-white p-6 rounded-lg shadow-md w-full mb-10 mt-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Report (Today)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Sales"]} />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#7C3AED"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 10, stroke: '#5B21B6', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default Graph;
