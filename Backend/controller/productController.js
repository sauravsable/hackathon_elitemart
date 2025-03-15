const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");

// Get Products
exports.getAllProducts = async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.estimatedDocumentCount();

  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()

  let filteredProductCount = await apifeature.query.clone().countDocuments();

  apifeature.pagination(resultPerPage);
  let products = await apifeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  });
};

// Get Product Details
exports.getProductDetails = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};

exports.getAllProductsForSearch = async (req, res) => {
  try {
    const allProductsForSearch = await Product.find();
    res.status(200).json({
      success: true,
      allProductsForSearch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





