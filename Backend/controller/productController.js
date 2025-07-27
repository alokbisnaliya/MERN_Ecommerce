const express = require('express');
const productmodel = require('../models/productmodel');


exports.getAllProducts = async (req, res) => {
    try {
       
       const categories = ['phones', 'fruits', 'watches', 'laptops', 'clothing', 'electronics', 'groceries'];

       

        const productsGroup = {};
        // console.log(allProducts);
        for(let category of categories){
            let products = await productmodel.aggregate([
                {
                   $match:{category:category}
                },
                {
                    $sample:{size:7}
                }
            ])
           
            productsGroup[category] = products

        }
      

      
      
        res.status(200).json({ ...productsGroup, message: "success" })

    }

    catch (error) {
        console.log({ "error occured": error });
        return res.status(500).json({ message: "Internal server error" })
    }
}




