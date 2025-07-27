const productmodel = require("../models/productmodel");

exports.getProductsBycategory = async (req, res) => {
  const { category, price, limit, sortby, currentPage } = req.query;
  const skip = (currentPage - 1) * limit;

  // Set sort options
  let sortOption = {};
  switch (sortby) {
    case "price_asc":
      sortOption = { price: 1 };
      break;
    case "price_desc":
      sortOption = { price: -1 };
      break;
    case "newest":
      sortOption = { createdAt: -1 };
      break;
    default:
      sortOption = { createdAt: 1 };
  }

  try {
    let query = {};
    
    if (category !== 'all') {
      query = {
        category: category,
        price: { $lte: Number(price) }
      };
    } else {
      query = {
        price: { $lte: Number(price) }
      };
    }

    const totalCount = await productmodel.countDocuments(query);

    const products = await productmodel
      .find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOption);

    res.status(200).json({
      products,
      totalCount,
      currentPage: Number(currentPage),
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
