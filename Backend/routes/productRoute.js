const express = require("express");
const { 
    getAllProducts,
    getProductDetails,
    getAllProductsForSearch
    } = require("../controller/productController");
    
const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/product/:id').get(getProductDetails);

router.route("/allproducts").get(getAllProductsForSearch);

module.exports = router;
