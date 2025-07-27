import { useEffect, useState } from 'react'
import React from 'react'
import PromoBanner from './components/PromoBanner'
import ProductFirst from './components/ProductFirst'
import Card from './components/Card'
import Card2 from './components/Card2'
import Card3 from './components/Card3'
const baseURL = import.meta.env.VITE_API_URL;


const Home = () => {

  const [phones, setPhones] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [watches, setWatches] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [categories, setCategories] = useState([])
  const [groceries, setGroceries] = useState([]);
  
  const productsData = async () => {
    try {
      let response = await fetch(`${baseURL}/api/products`);
      let data = await response.json();
      // console.log(data);
      if (response.ok) {
        setPhones(data.phones || []);
        setFruits(data.fruits || []);
        setWatches(data.watches || []);  
        setClothing(data.clothing || []);  
        setElectronics(data.electronics || []);  
        setGroceries(data.groceries || []);  
        
      }
    } catch (error) {
      console.log(error);
    }
  };


  let fetchCategories = async()=>{
    let res = await fetch(`${baseURL}/api/categories`);
    let data = await res.json();
    if(res.ok){
      setCategories(data.catWithImages)
    }
  }
  
  useEffect(() => {
    productsData();
    fetchCategories();
    
  }, []);
  




  return (
    <>
      <div className="px-4 sm:px-6 md:px-10  max-w-[2200px] mx-auto">
        <PromoBanner />
        <ProductFirst title="Smartphones" highlight="Grab the best deal on" route={"/products/phones"}/>
        <div className="flex flex-wrap gap-4 mt-4 justify-center ">
          <Card phones={phones} route={"/product"} />
        </div>
        <ProductFirst title="Top categories" highlight="Shop from " className="mt-6" route={"/products/all"}/>
        <div className="flex flex-wrap gap-4  justify-center ">
          <Card2 categories={categories} />
         
        </div>
        <ProductFirst title="Essentials" highlight="Daily" className="mt-5" route={"/products/all"}/>
        <div className="flex flex-wrap gap-4 mt-4 justify-center mb-10">
          <Card3 groceries={fruits}/>
        
        </div>

      </div>
    </>
  )
}

export default Home