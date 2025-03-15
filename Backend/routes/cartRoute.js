const express = require('express');
const {
    addCart,
    getCarts, 
    getCartDetails, 
    sendInvitation, 
    removeUserFromCart, 
    addProductToCart, 
    removeProductFromCart, 
    acceptInvitation, 
    cancelInvitation, 
    removeCart,
    removeAllProductsFromCart} = require('../controller/cartController');

const {isAuthenticatedUser} = require('../middleware/auth');
const redisCache = require('../config/redis');
const router = express.Router();

router.route("/create/cart").post(isAuthenticatedUser,addCart);

router.get("/getcarts",redisCache.route({expire:60*15}),isAuthenticatedUser,getCarts);

router.route("/removeCart").post(isAuthenticatedUser,removeCart);

router.route("/getcartDetails/:id").get(redisCache.route({expire:60*15}),isAuthenticatedUser,getCartDetails);

router.route("/send-cart-invitation").post(isAuthenticatedUser,sendInvitation);

router.route("/remove-cart-member").post(isAuthenticatedUser,removeUserFromCart);

router.route("/add-product-to-cart").post(isAuthenticatedUser,addProductToCart);

router.route("/remove-product-from-cart").post(isAuthenticatedUser,removeProductFromCart);

router.route("/remove-all-products-from-cart").post(isAuthenticatedUser,removeAllProductsFromCart);

router.route("/accept-invitation").post(acceptInvitation);

router.route("/reject-invitation").post(cancelInvitation);

module.exports = router;